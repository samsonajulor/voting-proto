import { ethers } from 'hardhat';

async function main() {
  const ballotContractAddress = '0x5befac33dEA0B9eB9b106115a1cc92bd99D05D0b';

  const ballotContract = await ethers.getContractAt('IBallot', ballotContractAddress);

  const [voter, voter2] = await ethers.getSigners();

  await ballotContract.giveRightToVote(voter.address);
  await ballotContract.giveRightToVote(voter2.address);

  await ballotContract.addCategory('presidential');
  await ballotContract.addCategory('governorship');
  // await ballotContract.getVotingCategories();
  await ballotContract.vote(0);
  await ballotContract.connect(voter2).vote(0);

  const winningCategoryIndex = await ballotContract.winningCategory();
  console.log('Winning category index:', winningCategoryIndex.toString());

  const winningCategoryName = await ballotContract.winningCategoryName();
  console.log('Winning category name:', winningCategoryName.toString());

  console.log('Interactions completed.');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

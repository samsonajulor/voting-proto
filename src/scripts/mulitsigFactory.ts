import { ethers } from 'hardhat';

async function main() {
  const multisig = await ethers.deployContract('MultiSigFactory', []);

  await multisig.waitForDeployment();

  console.log(`multisig wallet deployed to ${multisig.target}`)

  // const amount = ethers.parseEther('200');

  // get five signers
  // const [admin1, admin2, admin3, admin4, admin5, spender] = await ethers.getSigners();

  // // call create transaction
  // const receipt = await multisig.CreateMultiSigWallet(
  //   [admin1.address, admin2.address, admin3.address, admin4.address, admin5.address], {
  //     value: amount,
  //   }
  // );

  // get event
  // @ts-ignore
  // const newMultisig = await (await receipt.wait())?.logs[0]?.args[0]
  // console.log(newMultisig, 'event');
  
  // let multisigContract = await ethers.getContractAt('IMultiSig', newMultisig);

  // await multisigContract.CreateTransaction(spender.address, amount);
  // await multisigContract.GetTransaction(1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

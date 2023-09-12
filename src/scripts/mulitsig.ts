import { ethers } from 'hardhat';

async function main() {
  // get 10 signers
  const [admin1, admin2, admin3, admin4, admin5, spender] = await ethers.getSigners();

  const owners = [
    admin1.address,
    admin2.address,
    admin3.address,
    admin4.address,
    admin5.address,
    spender.address
  ];

  const lockedAmount = ethers.parseEther('10');

  const multisig = await ethers.deployContract('MultiSigMain', [owners], {
    value: lockedAmount,
  });

  await multisig.waitForDeployment();

  console.log(`multisig wallet deployed to ${multisig.target}`)

  const amount = ethers.parseEther('5');
  // call create transaction
  const receipt = await multisig.CreateTransaction(spender.address, amount);
  // get the event
  // @ts-ignore
  const event = await (await receipt.wait())?.logs[0]?.args
  console.log(event, 'event');

  // call approve transaction connect admin1 and admin2
  await multisig.connect(admin1).ApproveTransaction(event.txId);
  await multisig.connect(admin2).ApproveTransaction(event.txId);

  // get balance
  const balance = await multisig.GetBalance(admin1.address);

  // get transaction
  const [add, amt, approvals, isActive] = await multisig.GetTransaction(event.txId);
  console.log(`Address: ${add}`);
  console.log(`Amount: ${ethers.formatEther(amt)}`);
  console.log(`Approvals: ${approvals}`);
  console.log(`isActive: ${isActive}`);
  console.log(`Balance: ${ethers.formatEther(balance)}`);

  // send money to the contract from spender
  await spender.sendTransaction({
    to: multisig.target,
    value: ethers.parseEther('1')
  });

  // log all return values
  console.log(`current locked amount:`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

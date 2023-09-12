import { ethers } from 'hardhat';

async function main() {
  // const address = '0x7d0B0A1fD3f9Bff0c1175234f33478131aE86113';

  // let multisigContract = await ethers.getContractAt('IMultiSigWura', address);
  // console.log(`multisig wallet deployed to ${multisigContract.target}`);

  // const amount = ethers.parseEther('0.0000000000000000012345');

  // const deployedContractAddress = '0x7d0B0A1fD3f9Bff0c1175234f33478131aE86113'; // this is the deployed contract address
  const addresses = [
    '0xD4C42e502669947139D736b693C97b82D4d01F48',
    '0xb56A7fa5B7e8EAE9b301BA1Ec9528A44aB4d9FAb',
    '0x3E138E88970Cf97Fd947A7EF825d88fAb6Dcc6d9',
  ];

  // create multisig wallet
  const tx = await multisigContract.createMultisig(addresses);
  // log event
  // @ts-ignore
  const receipt = await(await tx.wait())?.logs[0]?.args[0];
  console.log(receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

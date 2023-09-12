const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying MyContract with the account:", deployer.address);

  // Replace with the actual contract address of S_M
  const ctfContractAddress = '0xA12F263c0cC0A060fD44C9B9a69606DE2Bc8583C';

  const MyContract = await ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy(ctfContractAddress);

  console.log("MyContract address:", myContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

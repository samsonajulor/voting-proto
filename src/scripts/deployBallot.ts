import { ethers } from "hardhat";

async function main() {
  const ballot = await ethers.deployContract("Ballot", []);

  await ballot.waitForDeployment();

  console.log(
    `Ballot deployed to ${ballot.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { ethers } from 'hardhat';

async function main() {
  // Contract Addresses
  const uniswapAddr = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
  const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

  // Users
  const bluetoothBoy = '0x3744DA57184575064838BBc87A0FC791F5E39eA2';
  const bluetoothBoySignature = await ethers.getImpersonatedSigner(bluetoothBoy);

  // Contract Instances
  const uniswapContract = await ethers.getContractAt('IUniswap', uniswapAddr);
  const UNIContract = await ethers.getContractAt('IERC20', UNI);
  const DAIContract = await ethers.getContractAt('IERC20', DAI);

  const factory = await uniswapContract.factory();
  const uniswapFactory = await ethers.getContractAt('IUniswapV2Factory', factory);

  const pairAddress = await uniswapFactory.getPair(UNI, DAI);

  console.log({ pairAddress });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

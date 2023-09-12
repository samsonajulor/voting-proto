import { ethers } from 'hardhat';

async function main() {
  const uniswapAddr = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
  const AAVE = '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9';

  const bluetoothBoy = '0x3744DA57184575064838BBc87A0FC791F5E39eA2';
  const bluetoothBoySignature = await ethers.getImpersonatedSigner(bluetoothBoy);

  const uniswapContract = await ethers.getContractAt('IUniswap', uniswapAddr);
  const UNIContract = await ethers.getContractAt('IERC20', UNI);
  const AAVEContract = await ethers.getContractAt('IERC20', AAVE);

  const factory = await uniswapContract.factory();
  const uniswapFactory = await ethers.getContractAt('IUniswapV2Factory', factory);

  const pairAddress = await uniswapFactory.getPair(UNI, AAVE);

  console.log({ pairAddress });

  const pairContract = await ethers.getContractAt('IUniswapV2Pair', pairAddress);

  // add liquidity
  const amountToAdd = ethers.parseEther('625');
  const amountMin = ethers.parseEther('0');
  const aDayFromNow = Math.round(Date.now() / 1000) + 64800;
  const addLiq = await uniswapContract
    .connect(bluetoothBoySignature)
    .addLiquidity(UNI, AAVE, amountToAdd, amountToAdd, amountMin, amountMin, bluetoothBoy, aDayFromNow);
  await addLiq.wait();

  const etherBalance = ethers.formatEther(await ethers.provider.getBalance(bluetoothBoy));
  const UNIBalance = ethers.formatEther(await UNIContract.balanceOf(bluetoothBoy));
  const AAVEBalance = ethers.formatEther(await AAVEContract.balanceOf(bluetoothBoy));
  const liquidityBalance = ethers.formatEther(await pairContract.balanceOf(bluetoothBoy));

  console.log({
    etherBalance,
    UNIBalance,
    AAVEBalance,
    liquidityBalance
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

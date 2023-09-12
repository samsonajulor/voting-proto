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

    const etherBal = ethers.formatEther(await ethers.provider.getBalance(bluetoothBoy));
    const UNIBal = ethers.formatEther(await UNIContract.balanceOf(bluetoothBoy));
    const AAVEBal = ethers.formatEther(await AAVEContract.balanceOf(bluetoothBoy));
    const liquidityBal = ethers.formatEther(await pairContract.balanceOf(bluetoothBoy));

    console.log({
      etherBal,
      UNIBal,
      AAVEBal,
      liquidityBal,
    });

  // Approval
  const allowance = ethers.parseEther('450000000');
  const approveUNI = await UNIContract.connect(bluetoothBoySignature).approve(uniswapAddr, allowance);
  const approveAAVE = await AAVEContract.connect(bluetoothBoySignature).approve(uniswapAddr, allowance);
  const approveLiquidityPair = await pairContract.connect(bluetoothBoySignature).approve(uniswapAddr, allowance);

  await approveUNI.wait();
  await approveAAVE.wait();
  await approveLiquidityPair.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

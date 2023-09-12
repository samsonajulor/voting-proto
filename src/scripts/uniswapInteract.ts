import { ethers } from 'hardhat';

// interface IUniswapV2 {
//     function factory() external pure returns (address);
//     function WETH() external pure returns (address);

//     function addLiquidity(
//         address tokenA,
//         address tokenB,
//         uint amountADesired,
//         uint amountBDesired,
//         uint amountAMin,
//         uint amountBMin,
//         address to,
//         uint deadline
//     ) external returns (uint amountA, uint amountB, uint liquidity);

//     function removeLiquidity(
//         address tokenA,
//         address tokenB,
//         uint liquidity,
//         uint amountAMin,
//         uint amountBMin,
//         address to,
//         uint deadline
//     ) external returns (uint amountA, uint amountB);
// }

async function main() {
  const routerAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

  const tokenA = '0x20bB82F2Db6FF52b42c60cE79cDE4C7094Ce133F';
  const tokenB = '0x20bB82F2Db6FF52b42c60cE79cDE4C7094Ce133F';
  const amountADesired = ethers.parseEther('1');
  const amountBDesired = ethers.parseEther('1');
  const amountAMin = 0;
  const amountBMin = 0; 
  const deadline = Math.floor(Date.now() / 1000) + 3600;

  const [owner] = await ethers.getSigners();

}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

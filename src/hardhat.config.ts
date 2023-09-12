import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import { private_key_1, private_key_2, private_key_3, baserpc, etherscan_api_key, mainnet } from '../secrets.json';

const config: HardhatUserConfig = {
  solidity: '0.8.13',
  networks: {
    sepolia: {
      url: baserpc,
      accounts: [private_key_1, private_key_2, private_key_3],
    },
    hardhat: {
      forking: {
        url: mainnet,
      },
    },
  },
  etherscan: {
    apiKey: {
      sepolia: etherscan_api_key,
    },
  },
};

export default config;

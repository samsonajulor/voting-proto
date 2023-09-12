import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { private_key_1, private_key_2, private_key_3, mnemonic, baserpc, base_api_key } from "./secrets.json";

const config: HardhatUserConfig = {
  solidity: '0.8.13',
  networks: {
    base: {
      url: baserpc,
      accounts: [private_key_1, private_key_2, private_key_3],
    },
    //   polygon: {
    //     url: rpcUrl,
    //     chainId: 137, // Polygon Mainnet
    //     accounts: mnemonic ? { mnemonic } : [privateKey],
    //   },
  },
};

export default config;

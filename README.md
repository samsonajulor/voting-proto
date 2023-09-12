# voting-proto

### BALLOT CONTRACT ADDRESS = 0x5befac33dEA0B9eB9b106115a1cc92bd99D05D0b

This Contract was deployed to sepolia testnet via the following commands

- RUN `cd src`
- RUN `npx hardhat compile`
- RUN `npx hardhat run scripts/deployBallot.ts --network sepolia`

#### Verifying the tokens
- RUN `npx hardhat verify --contract contracts/ethTok.sol:ETHToken  --network sepolia 0x18aBf89D5932B62Ee68101D9F689c4200FA55096` to verify the ethTok
- Verification url: [ethToken url](https://sepolia.etherscan.io/address/0x18aBf89D5932B62Ee68101D9F689c4200FA55096#code)
- RUN `npx hardhat verify --contract contracts/usdcTok.sol:USDCToken  --network sepolia 0x57Df052B630Dd1a713C91CB87FAE9fC03AA3182a` to verify the usdcTok
- Verification url: [usdcToken url](https://sepolia.etherscan.io/address/0x57Df052B630Dd1a713C91CB87FAE9fC03AA3182a#code)


#### Running a local node of the forked sepolia network
- RUN `npx hardhat node`

#### Interacting with the contract locally
- RUN `npx hardhat run scripts/swapperInteract.ts --network localhost`

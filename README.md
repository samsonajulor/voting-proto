# voting-proto

### BALLOT CONTRACT ADDRESS = 0x5befac33dEA0B9eB9b106115a1cc92bd99D05D0b

This Contract was deployed to sepolia testnet via the following commands

- RUN `cd src`
- RUN `npx hardhat compile`
- RUN `npx hardhat run scripts/deployBallot.ts --network sepolia`

#### Running a local node of the forked sepolia network
- RUN `npx hardhat node`
- RUN `npx hardhat run scripts/uniswapInteract.ts --network sepolia`
- RUN `npx hardhat run scripts/addLiquidity.ts --network sepolia`
- RUN `npx hardhat run scripts/removeLiquidity.ts --network sepolia`

#### Interacting with the contract locally
- RUN `npx hardhat run scripts/swapperInteract.ts --network localhost`

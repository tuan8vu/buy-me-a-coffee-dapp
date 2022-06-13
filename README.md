# BuyMeACoffee solidity contract

Deploy a decentralized "Buy Me a Coffee" smart contract that allows visitors to send you (fake) ETH as tips and leave nice messages, using Alchemy, Hardhat, Ethers.js, and Ethereum Goerli.

![buymeacoffee](https://user-images.githubusercontent.com/55645692/173356747-eaebeeb4-1124-4118-838f-593bd637a997.png)

Deploy your contract with:

```
npx hardhat run scripts/deploy.js
```

Run an example buy coffee flow locally with:

```
npx hardhat run scripts/buy-coffee.js
```

Once you have a contract deployed to Goerli testnet, grab the contract address and update the `contractAddress` variable in `scripts/withdraw.js`, then:

```
npx hardhat run scripts/withdraw.js
```

will allow you to withdraw any tips stored on the contract.

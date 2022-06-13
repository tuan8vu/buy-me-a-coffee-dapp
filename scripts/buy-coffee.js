// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

// Returns the Ether balance of a given address
async function getEtherBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
  // We use the ethers.js library to convert the balanceBigInt to a string.;
}

// Logs the Ether balance for a list of addresses, owner, tipper, contract address
async function printBalances(addresses) {
  let idx = 0;
  // loop through the addresses
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getEtherBalance(address));
    idx++;
  }
}

// Logs the memos stored on-chain from coffee purchases
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`);
  }
}


async function main() {
  // Get example accounts
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  // Get the coffee contract & deploy it
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee deployed to ", buyMeACoffee.address);

  // Check balances before purchase
  const addresses = [owner.address, tipper.address, buyMeACoffee.address];
  await printBalances(addresses);

  // Buy the owner a few coffee
  const tip = { value: hre.ethers.utils.parseEther("1.0") };
  await buyMeACoffee.connect(tipper).buyCoffee("Caroline", "You're the best", tip);
  await buyMeACoffee.connect(tipper2).buyCoffee("Tuan", "Amazing", tip);
  await buyMeACoffee.connect(tipper3).buyCoffee("Anh", "Good job!", tip);

  // Check balances after coffee purchase
  console.log("\nAfter coffee purchase:");
  await printBalances(addresses);

  // Withdraw funds
  await buyMeACoffee.connect(owner).withdrawTips();

  // Check balances afte withdraw
  console.log("== After withdraw:");
  await printBalances(addresses);

  // Read all the memos left for the owner
  console.log("== Memos:");
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

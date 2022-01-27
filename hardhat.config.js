/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle')
require('dotenv').config()
const PrivateKey1 = process.env.PRIVATE_KEY1;
const PrivateKey2 = process.env.PRIVATE_KEY2;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
  });
  
module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/z31OMjGDYva-LH4So0aR9WBDXsb_R9Iq",
      accounts: [`0x${PrivateKey1}`,`0x${PrivateKey2}`] //Two private keys here
    },
  }
};

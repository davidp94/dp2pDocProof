var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = require('./credentials/mnemonic.js');
module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "http://localhost:8686"),
      // port: 8686,
      network_id: "3",
      gas: 5000000,
      gasPrice: 200000000000
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};

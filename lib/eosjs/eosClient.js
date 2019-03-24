const Eos = require("eosjs");

const { keys, rpc, chainId } = require("config").eosjs;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const eosClient = Eos({
  chainId,
  keyProvider: keys,
  httpEndpoint: rpc[getRandomInt(0, rpc.length - 1)],
  expireInSeconds: 60,
  broadcast: true,
  verbose: false,
  sign: true
});

module.exports = eosClient;

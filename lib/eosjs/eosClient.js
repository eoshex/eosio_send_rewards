const { Api, JsonRpc, RpcError } = require("eosjs");
const { JsSignatureProvider } = require("eosjs/dist/eosjs-jssig"); // development only
const fetch = require("node-fetch"); // node only
const { TextDecoder, TextEncoder } = require("util"); // node only
// const { TextEncoder, TextDecoder } = require("text-encoding"); // React Native, IE11, and Edge Browsers only
const config = require("config");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const privateKeys = config.eosjs.keys;
const rpcEndpoint = config.eosjs.endpoint[getRandomInt(0, config.eosjs.endpoint.length - 1)];
const signatureProvider = new JsSignatureProvider(privateKeys);
const rpc = new JsonRpc(rpcEndpoint, { fetch });
const api = new Api({ rpc: rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

module.exports = { rpc, api };

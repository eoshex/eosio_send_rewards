const cron = require("node-cron");
const BigNumber = require("bignumber.js");
const config = require("config");
const { account_list } = require("./accounts");
const eos = require("./lib/eosjs/eosClient");

const transfer = async () => {
  let tgMsg = `💰VOTE REWARD ${new Date()}\n========================\n`;
  const contract = await eos.contract("eosio.token");
  let total_amount = BigNumber(0);
  for (const account of account_list) {
    const to = account.name;
    const eosAmount = BigNumber(account.amount).dp(5);
    const eosAmountStr = eosAmount.toFixed(5).substring(0, eosAmount.toFixed(5).indexOf(".") + 5);
    if (eosAmount.isGreaterThan(0)) {
      total_amount = total_amount.plus(eosAmountStr);
      await contract.transfer(config.eosjs.account_name, to, `${eosAmountStr} EOS`, "");
      tgMsg += `transferred to ${to} "${eosAmountStr} EOS"\n`;
    }
  }
  tgMsg += `total amount transferred "${total_amount.toString()} EOS"`;
  console.log(tgMsg);
};

const main = async () => {
  try {
    cron.schedule(
      "0 12 * * *",
      async () => {
        await transfer();
        console.debug("Runing a job at 12:00 at Etc/UTC timezone every day");
      },
      {
        scheduled: true,
        timezone: "Etc/UTC"
      }
    );
  } catch (e) {
    console.error("transfer err!!! ", e);
  }
};

main();

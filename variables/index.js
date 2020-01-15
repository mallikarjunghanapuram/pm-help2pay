

const help2payCheckoutUrl = process.env.HELP2PAY_CHECKOUT_URL;
const help2payPrivateKeyLocation = process.env.HELP2PAY_PRIVATE_KEY;
const help2payTransactionDepositQueryUrl = process.env.HELP2PAY_TRANSACTION_DEPOSIT_QUERY_URL;
const help2payTransactionPayoutQueryUrl = process.env.HELP2PAY_TRANSACTION_PAYOUT_QUERY_URL;
const help2payPayoutUrl = process.env.HELP2PAY_PAYOUT_URL;
const payoutNotifyUrl = process.env.HELP2PAY_PAYOUT_NOTIFY_URL;

const env = process.env.NODE_ENV || "development";
const host = process.env.APP_HOST || "localhost";
const port = process.env.APP_PORT || 5050;
const name = process.env.APP_NAME || "pm-help2pay-adapter";
const logLevel = process.env.LOG_LEVEL;
const awsRegion = process.env.AWS_REGION;
const notifyUrl = process.env.HELP2PAY_NOTIFY_URL;
const depositReturnUrl = process.env.HELP2PAY_DEPOSIT_RETURN_URL;
const apiVersion = process.env.HELP2PAY_API_VERSION;
const userId = process.env.HELP2PAY_USER_ID;

const variables = {
  env,
  host,
  logLevel,
  name,
  port,
  help2payCheckoutUrl,
  help2payPrivateKeyLocation,
  help2payTransactionDepositQueryUrl,
  help2payTransactionPayoutQueryUrl,
  awsRegion,
  notifyUrl,
  apiVersion,
  userId,
  help2payPayoutUrl,
  payoutNotifyUrl,
  depositReturnUrl
};

module.exports = variables;
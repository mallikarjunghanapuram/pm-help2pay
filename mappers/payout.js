const payoutMapper = {
    //Key
    payIp: "ClientIP",
    returnUrl: "FrontURI",
    merchantId: "MerchantCode",
    vendorOrderId: "TransactionID",
    currency: "CurrencyCode",
    memberId:"MemberCode",
    amount: "Amount",
    //TransactionDateTime
    bankName: "BankCode",
    accountName:"ToBankAccountName",
    accountNumber:"ToBankAccountNumber",
    bankProvince:"ToProvince",
    bankCity:"ToCity",
};
module.exports = { payoutMapper };


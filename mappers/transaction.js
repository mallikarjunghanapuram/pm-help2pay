const transactionMapper = {
    merchantId: "Merchant",
    currency: "Currency",
    memberId:"Customer",
    vendorOrderId: "Reference",
    //Key
    amount: "Amount",
    productName: "Note",
    //Datetime
    returnUrl: "FrontURI",
    notifyUrl: "BackURI",
    subIssuingBank: "Bank",
    Language: "Language",
    payIp: "ClientIP",
};
module.exports = { transactionMapper };


// const transactionMapper = {
//     version: "service_version",
//     merchantId: "partner_code",
//     vendorOrderId: "partner_orderid",
//     memberId: "member_id",
//     payIp: "member_ip",
//     currency: "currency",
//     amount: "amount",
//     productName: "remarks",
//     notifyUrl: "backend_url",
//     returnUrl: "redirect_url",
//     subIssuingBank: "bank_code",
// };
// module.exports = { transactionMapper };
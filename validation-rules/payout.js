

const payoutRules = {
    payIp:"required",
    returnUrl:"required",
    amount: "required|decimal",
    currency: "required",
    merchantId: "required",
    vendorOrderId: "required",
    memberId: "required",
    accountName: "required",
    bankName: "required",
    accountNumber: "required",
    bankProvince: "required",
    bankCity: "required",
};
module.exports = payoutRules;
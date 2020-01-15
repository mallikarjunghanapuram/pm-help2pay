
const axios = require('axios');
const querystring = require('querystring');

exports.payoutTransaction = async function (actionURL, {
    ClientIP,
    FrontURI,
    MerchantCode,
    TransactionID,
    CurrencyCode,
    MemberCode,
    BankCode,
    toBankAccountNumber,
    toBankAccountName,
    toProvince,
    toCity

}) {

    const params = {
        ClientIP,
        FrontURI,
        MerchantCode,
        TransactionID,
        CurrencyCode,
        MemberCode,
        BankCode,
        toBankAccountNumber,
        toBankAccountName,
        toProvince,
        toCity
    
    };

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const payoutResponse = await axios.post(actionURL, querystring.stringify(params), config)
    return payoutResponse.data;
}

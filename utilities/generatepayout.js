

const crypto = require("crypto");
const variables = require("../variables");
const parameterStoreService = require("../utilities/parameterStore");


exports.generatepayout = async function ({
    
    MerchantCode,
        TransactionID ,
        MemberCode,
        Amount ,
        CurrencyCode ,
        TransactionDateTime ,
        ToBankAccountNumber,
        
}){

    console.log(MerchantCode);
    console.log(TransactionID)
    console.log(MemberCode)
    console.log(TransactionDateTime)
    console.log(ToBankAccountNumber)
    
    console.log(Amount)
    console.log(CurrencyCode)


    let private_key = "aOUX4Lc0OjUUtfBv0HK8" ;
    console.log(private_key)

    TransactionDateTime = TransactionDateTime.replace(/(-|:| |PM|AM)/g, function(m){
        switch(m) {
            case '-': return '';
            case ':': return '';
            case ' ': return '';
            case 'PM':return '';
            case 'AM': return '';
          
        }
    });

    let payoutstring = objectpayoutstring({
        
        MerchantCode,
        TransactionID,
        MemberCode,
        Amount,
        CurrencyCode,
        TransactionDateTime,
        ToBankAccountNumber,
        private_key, 
         
    });

    console.log(payoutstring);

    let hash = crypto.createHash('md5').update(payoutstring).digest("hex"); 
    return hash;

};

const objectpayoutstring = requestObj => {
    const payoutstring = Object.entries(requestObj)
    .map(([key, val]) => `${val}`)
    .join('');
    return payoutstring;
}

exports.objectpayoutstring = objectpayoutstring;

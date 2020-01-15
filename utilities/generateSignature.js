"use strict";

const crypto = require("crypto");
const variables = require("../variables");
const parameterStoreService = require("../utilities/parameterStore");

exports.generateSignature = async function (requestParams,method){
    // console.log(requestParams);
    // console.log(method);
    let private_key = "aOUX4Lc0OjUUtfBv0HK8" ;
    let paramString;
    if ( method  == 'payout') 
    {
        //console.log(requestParams.TransactionDateTime);
        const TransactionDateTime = requestParams.TransactionDateTime.replace(/(-|:| |PM|AM)/g, function(m){

            switch(m) {
                case '-': return '';
                case ':': return '';
                case ' ': return '';
                case 'PM':return '';
                case 'AM': return '';
              
            }
        });

        paramString = objectToParamString({
        
            MerchantCode: requestParams.MerchantCode,
            TransactionID: requestParams.TransactionID,
            MemberCode: requestParams.MemberCode,
            Amount: requestParams.Amount,
            CurrencyCode: requestParams.CurrencyCode,
            TransactionDateTime,
            ToBankAccountNumber: requestParams.ToBankAccountNumber,
            private_key, 
             
        });
        console.log(paramString)
    } 
    else {
        
        const Datetime = requestParams.Datetime.replace(/(-|:| |PM|AM)/g, function(m){
            switch(m) {
                case '-': return '';
                case ':': return '';
                case ' ': return '';
                case 'PM':return '';
                case 'AM': return '';
              
            }
        });

        paramString = objectToParamString({
            
            Merchant: requestParams.Merchant,
            Reference: requestParams.Reference ,
            Customer: requestParams.Customer ,
            Amount: requestParams.Amount ,
            Currency: requestParams.Currency ,
            Datetime ,
            private_key ,
            ClientIP: requestParams.ClientIP 

        });
        //console.log(paramString)
    }
    
    
    // let private_key = "aOUX4Lc0OjUUtfBv0HK8" ;
    // if (!private_key) {
    //     private_key = await parameterStoreService.getParameter(
    //         variables.eeziepayPrivateKeyLocation
    //     );
    // }

    // let paramString = objectToParamString(object);
    // paramString = paramString + "&key=" + private_key;
    // const shasum = crypto.createHash('sha1');
    // shasum.update(paramString);
    // const signature = shasum.digest('hex');
    // return signature.toUpperCase();
        

    
    
    // Datetime = Datetime.replace(/(-|:| |PM|AM)/g, function(m){
    //     switch(m) {
    //         case '-': return '';
    //         case ':': return '';
    //         case ' ': return '';
    //         case 'PM':return '';
    //         case 'AM': return '';
          
    //     }
    // });
    
    // let payoutstring = objectpayoutstring({
    //     MerchantCode,
    //     TransactionID,
    //     MemberCode,
    //     Amount,
    //     CurrencyCode,
    //     TransactionDatetime,
    //     ToBankAccountNumber,
    //     SecurityCode 
    // });

    // let paramString = objectToParamString({
    //     Merchant,
    //     Reference ,
    //     Customer ,
    //     Amount ,
    //     Currency ,
    //     Datetime ,
    //     private_key ,
    //     ClientIP 
    // });
    // console.log(paramString)
    
    let hash = crypto.createHash('md5').update(paramString).digest("hex"); 
    return hash;

};

//     let signString = objectToSignString(object);
//     signString = signString + ":" + private_key;
//     let hash = crypto.createHash('md5').update(signString).digest("hex");    
//     return hash;
// };
// const objectToSignString = requestObj => {
//     const signString = Object.entries(requestObj)
//     .map(([key, val]) => `${val}`)
//     .join('|');
//     return signString;
// }

const objectToParamString = requestObj => {
    const paramString = Object.entries(requestObj)
    .map(([key, val]) => `${val}`)
    .join('');
    return paramString;
}





// const crypto = require("crypto");
// const variables = require("../variables");
// const parameterStoreService = require("../utilities/parameterStore");

// exports.generateSignature = async object => {
//     let private_key;
//     if (!private_key) {
//         private_key = await parameterStoreService.getParameter(
//             variables.tenTenPrivateKeyLocation
//         );
//     }

//     let signString = objectToSignString(object);
//     signString = signString + ":" + private_key;
//     let hash = crypto.createHash('md5').update(signString).digest("hex");    
//     return hash;
// };

// const objectToSignString = requestObj => {
//     const signString = Object.entries(requestObj)
//     .map(([key, val]) => `${val}`)
//     .join('|');
//     return signString;
// }
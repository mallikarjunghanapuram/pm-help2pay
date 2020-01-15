

const payoutMapper = require("../mappers/payout");
const errorResponseHandler = require("../utilities/pc-helpers/errorResponseHandler");
const payoutRules = require("../validation-rules/payout");
const { transformer } = require("../utilities/transformers");
const { validate } = require("../utilities/validator");
const { generateSignature } = require("../utilities/generateSignature");
//const { generatepayout } = require("../utilities/generatepayout");
const { payoutTransaction } = require("../models/payout")
const { responsePayoutStatus } = require("../utilities/responseStatusFormatter");
const xml2js = require('xml2js');
const util = require('util');

xml2js.parseStringPromise = util.promisify(xml2js.parseString);

const variables = require("../variables");

exports.payout = async function (ctx) {
    try {
        const {
            
            payIp,
            returnUrl,
            merchantId,
            vendorOrderId,
            currency,
            amount,
            bankName,
            accountNumber,
            accountName,
            bankProvince,
            bankCity
            
        } = ctx.request.body;

        const payoutRequest = {
            
            payIp,
            returnUrl,
            merchantId,
            vendorOrderId,
            currency,
            memberId: variables.userId,
            amount: amount,
            bankName,
            accountNumber,
            accountName,
            bankProvince,
            bankCity,
            notifyUrl: variables.payoutNotifyUrl,
            
            
            version: variables.apiVersion
        };

        validate(payoutRequest, payoutRules);

        const payoutTransfer = transformer({
            fields: payoutRequest,
            mapper: payoutMapper.payoutMapper,
            opts: ["-n", "-sm"]
        });
        
        // var asiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Shanghai"});
        // payoutTransfer.TransactionDateTime = formatDate(new Date(asiaTime));
        var asiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Shanghai"});
        payoutTransfer.TransactionDateTime = formatDate(new Date(asiaTime));

        //console.log(payoutTransfer);


        // const sign = await generatepayout(payoutTransfer);
        // payoutTransfer.Key = sign;
        
        // const sign = await generateSignature(payoutTransfer);
        // payoutTransfer.Key = sign;
        

        const sign = await generateSignature(payoutTransfer, 'payout');
        payoutTransfer.Key = sign;
        
        // payoutTransfer.remarks = payoutRequest.productName;
        
        console.log(payoutTransfer);



        const payoutXMLResponse = await payoutTransaction(variables.help2payPayoutUrl, payoutTransfer);
        const payoutJSONResponse = await xml2js.parseStringPromise(payoutXMLResponse);
        const payoutResponse = payoutJSONResponse.xml;

        if (!!payoutResponse.status) {
            const newPayoutResponse = {
                transactionStatus: responsePayoutStatus(payoutResponse.status[0]),
                amount: (payoutResponse.amount[0] / 100).toFixed(2),
                vendorOrderId: payoutResponse.partner_orderid[0],
                vendorReferenceId: payoutResponse.billno[0],
                currency: payoutResponse.currency[0],
                fee: payoutResponse.fee[0]
            }
            ctx.response.ok(newPayoutResponse, "Successfully initiated payout");
        }
        else if (!!payoutResponse.error_code && !!payoutResponse.error_description)
            ctx.response.badRequest(null, payoutResponse.error_description[0]);
        else {
            ctx.response.badRequest(null, "Something went wrong");
        }

    } catch (error) {
        errorResponseHandler(ctx, error);
    }
};

function formatDate(date) 
{
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM'; 
    
    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    var strTime = hours + ':' + minutes + ':' + seconds + '' + ampm;

    var month = date.getMonth()+1;
    month = month < 10 ? '0'+month : month;
    var day = date.getDate();
    day = day < 10 ? '0'+day : day;

    return date.getFullYear() + "-" + month + "-" + day + " " + strTime;     
    
}
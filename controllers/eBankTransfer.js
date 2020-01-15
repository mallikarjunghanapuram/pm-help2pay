

const transactionMapper = require("../mappers/transaction");
const errorResponseHandler = require("../utilities/pc-helpers/errorResponseHandler");
const eBankTransferRules = require("../validation-rules/eBankTransfer");
const { transformer } = require("../utilities/transformers");
const { validate } = require("../utilities/validator");
const { generateSignature } = require("../utilities/generateSignature");
const { gateWayHandler } = require("../models/eBankTransfer");
const variables = require("../variables");


exports.eBankTransfer = async function (ctx) {
    try {
        const eBankTransferRequest = ctx.request.body;
        eBankTransferRequest.version = variables.apiVersion;
        eBankTransferRequest.notifyUrl = variables.notifyUrl;
        eBankTransferRequest.returnUrl = variables.depositReturnUrl;
        eBankTransferRequest.memberId = variables.userId;
        validate(eBankTransferRequest, eBankTransferRules);

        const eBankTransfer = transformer({
            fields: eBankTransferRequest,
            mapper: transactionMapper.transactionMapper,
            opts: ["-n", "-sm"]
        });

        // eBankTransfer.Datetime = formatDate(new Date(asiaTime));
        
        var asiaTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Shanghai"});
        eBankTransfer.Datetime = formatDate(new Date(asiaTime));
        asiaTime = new Date(asiaTime);
        console.log('Asia time: '+asiaTime.toLocaleString());
        

        const sign = await generateSignature(eBankTransfer,'BankTransfer');
        eBankTransfer.Key = sign;

        // eBankTransfer.Datetime = date;
        console.log(eBankTransfer);

        // help2Pay Gateway
        const gateWayResponseHTML = await gateWayHandler(variables.help2payCheckoutUrl, eBankTransfer);
        ctx.body = gateWayResponseHTML;


    } catch (error){
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

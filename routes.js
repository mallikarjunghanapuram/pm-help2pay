
const Router = require("koa-router");

const eBankTransferController = require("./controllers/eBankTransfer");
const payoutController = require("./controllers/payout");

const router = new Router();

router.post("/bank-transfer", eBankTransferController.eBankTransfer);
router.post("/payout", payoutController.payout);

module.exports = router;
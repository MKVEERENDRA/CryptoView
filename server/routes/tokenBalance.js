const express = require("express");
const { getTokenBalance } = require("../controllers/tokenBalanceController");

const router = express.Router();

router.post("/balance", getTokenBalance);

module.exports = router;

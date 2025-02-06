const express = require("express");
const { storeOnIPFS, retrieveFromIPFS } = require("../controllers/ipfsController");

const router = express.Router();

router.post("/store", storeOnIPFS);
router.get("/retrieve/:id", retrieveFromIPFS);

module.exports = router;

const express = require("express");
const router = express.Router();
const { createLoan, makePayment, getLedger } = require("../controllers/loanController");

router.post("/", createLoan);
router.post("/:loan_id/payments", makePayment);
router.get("/:loan_id/ledger", getLedger);

module.exports = router;
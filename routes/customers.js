const express = require("express");
const router = express.Router();
const { getCustomerOverview } = require("../controllers/customerController");

router.get("/:customer_id/overview", getCustomerOverview);

module.exports = router;
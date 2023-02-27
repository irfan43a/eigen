const express = require("express");
const router = express.Router();
const checkoutController = require("../controller/checkoutController.js");

router
.get("/", checkoutController.getAllCheckout);

module.exports = router;
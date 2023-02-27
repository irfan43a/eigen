const express = require("express");
const router = express.Router();
const member = require("./memberRoutes");
const book = require("./bookRoutes");
const checkout = require("./checkoutRoutes");

router.use("/member", member).use("/book", book).use("/checkout", checkout);

module.exports = router;

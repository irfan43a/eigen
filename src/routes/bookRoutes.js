const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController.js");

router
.get("/", bookController.getAllBook);

module.exports = router;
const express = require("express");
const router = express.Router();
const memberController = require("../controller/memberController");

router
.get("/", memberController.getAllMember)
.post("/", memberController.insertMember)
.put("/:id", memberController.updateMember)
.delete("/:id", memberController.deleteMember);

module.exports = router;

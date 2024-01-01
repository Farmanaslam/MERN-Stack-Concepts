const authcontroller = require("../controller/auth");
const express = require("express");
const router = express.Router();
router.post("/signUp", authcontroller.signUp);
router.post("/login", authcontroller.login);
exports.router = router;

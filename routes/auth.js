const authController = require("../controllers/auth_controller");

const express = require('express');
const checkAuth = require("../middlewares/auth");
const router = express.Router();

router.route('/login')
.post(authController.login.post);

router.route('/register')
.post(authController.register.post);

router.route('/verifyOtp')
.post(authController.verifyOtp.post);

module.exports = router;

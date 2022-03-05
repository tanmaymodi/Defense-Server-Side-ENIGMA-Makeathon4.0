const authController = require("../controllers/auth_controller");
const { Data } = require('../models/beml_data');
const express = require('express');
const checkAuth = require("../middlewares/auth");
const router = express.Router();


router.route('/')
.get(async(req, res) => {

    res.render('home.ejs');
});

router.route('/dashboard')
.get(async(req, res) => {
    res.render('dashboard.ejs');
})
.post(authController.login.post);



router.route('/login')
.get(async(req, res) => {
    res.render('login.ejs');
})
.post(authController.login.post);

router.route('/register')
.get(async(req, res) => {
    res.render('register.ejs');
})
.post(authController.register.post);

router.route('/verifyOtp')
.get(async(req, res) => {
    res.render('verifyOtp.ejs');
})
.post(authController.verifyOtp.post);


module.exports = router;
const jwt = require('jwt-simple');
const { mailerConfig } = require('../config/mailer');
const { authHelper } = require('../helpers/authHelper');
const mailer = require('../helpers/mailer');
const { Data } = require('../models/beml_data');
const User = require('../models/user');

const errp = "authcontroller";

var authController = {
    login: {
        post: async(req, res) => {
            try {
                console.log("login post");
                const {email, password} = req.body;
                const user = await User.findOne({email: email});
                if(!user){
                    throw {status: 401, err: "No email exists"};
                }
                if(!user.registered){
                    throw {success: false, err: "Unverified user"};
                }
                
                var pwdmatch = await authHelper.comparePasswords(password, user.password);
                if(!pwdmatch){
                    throw {status: 403, err: "Wrond Password!"};
                }
                var token = await authHelper.generateAuthToken(user), decoded;
                try {
                    decoded = await jwt.decode(token, process.env.authSecret);
                } catch (err) {
                    throw {status: 500, err: "Server error"};
                }
                res.locals.auth = true;
                res.cookie('authtoken', token, {
                    httpOnly: true,
                    path: '/',
                    maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
                });
                return res.status(200).send({success: true, msg: 'Login success', token: token, user: user});
            } catch (err) {
                console.log(errp, "login err:", err.err || err);
                return res.status(err.status || 500).json({ success: false, err: err.err || "Server error", msg: 'Trouble in authenticating you!' });
            }
        }
    },

    register: {
        post: async(req, res) => {
            try {
                console.log("register post");
                var nuser = req.body;
                var {email, password, name, username} = req.body;
                var user = await User.findOne({email: email});
                if(user){
                    throw {status: 409, err: 'email already exists'};
                }
                user = await User.findOne({username: username});
                if(user){
                    throw {status: 409, err: 'username already exists'};
                }
                const hash = await authHelper.hashPassword(password);
                var otp = authHelper.genOtp();
                nuser.otp = otp;
                nuser.password = hash;
                const newuser = new User(nuser);
                await newuser.save();
                var newUser = await User.findOne({email: nuser.email});
                var token = await authHelper.generateAuthToken(newUser);
                res.cookie('authtoken', token, {
                    httpOnly: true,
                    path: '/',
                    maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
                });
                // var mail = mailer.sendOtp(newuser);
                var transposter = mailerConfig.getMailer();
                // console.log("tra: ", transposter);
                try {
                    var mailOptions = {
                        from: transposter.options.auth.user,
                        to: newuser.email,
                        subject: 'Otp from todo',
                        html: '\n <div style="font-size:25px">Hello ' + newuser.username + '</div>\n <div style="font-size:25px"> OTP for verification on Todo:<br> <b>' + newuser.otp + '</b></div>'
                    }
                    // console.log("mailOptions: ", mailOptions);
                    transposter.sendMail(mailOptions, (err, data) => {
                        if(err) throw err;
                        console.log("nodemailer", data);
                        return res.status(200).send({success: true, msg: 'Successfully registered', token: token});
                    })
                } catch (err) {
                    throw {status: 409, err: "Can't send otp", det: err};
                }
                
                // console.log("mail:", mail);
                // if(!mail['success'])return mail;
                
            } catch (err) {
                console.log(errp, "register err:", err.det || err);
                return res.status(err.status || 500).json({ success: false, err: err.err || "Server error", msg: 'Trouble in registering you!' });
            }
        }
    },

    verifyOtp: {
        post: async(req, res) => {
            try {
                console.log(req.body);
                var email = req.body.email;
                const user = await User.findOne({email: email});
                console.log("verifyOtp post, user:", user);
                if(!user){
                    throw {status: 409, err: "You have to register yourself!"};
                }
                var userOtp = req.body.otp;
                if(user.otp.toString() === userOtp.toString()){
                    await User.updateOne({email: user.email}, { $set: {otp: '', registered: true}});
                    return res.status(200).send({success: true, msg: 'Verified'});
                } else {
                    throw {status: 400, err: "Invalid otp!"};
                }
            } catch (err) {
                console.log(errp, "verifyOtp err:", err.err || err);
                return res.status(err.status || 500).json({ success: false, err: err.err || "Server error", msg: 'Trouble in otp verification!' });
            }
        }
    },

    logout: async(req, res) => {
        try {
            if(!req.user){
                return res.redirect('/');
            }
      
            res.clearCookie('authtoken', { path: '/' })
            return res.json({ msg: "Logged out!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    
}


module.exports = authController;
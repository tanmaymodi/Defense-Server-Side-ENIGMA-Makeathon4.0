const nodemailer = require('nodemailer');
const { authHelper } = require('./authHelper');

var mailer = {
    sendOtp: async(newuser) => {
        try {
            var otpEmail = process.env.otpEmail;
            var otpPass = process.env.otpPass;
            var transposter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: otpEmail,
                    pass: otpPass
                }
            });
            var mailOptions = {
                from: otpEmail,
                to: newuser.email,
                subject: 'Otp from todo',
                html: '\n <div style="font-size:25px">Hello ' + newuser.username + '</div>\n <div style="font-size:25px"> OTP for verification on Todo:<br> <b>' + newuser.otp + '</b></div>'
            }
            return transposter.sendMail(mailOptions, (err, res) => {
                if(err) throw err;
                console.log("nodemailer", res);
            })
        } catch (err) {
            console.log("nodemailer err:", err);
            return {success: false, msg: "can't send OTP"};
        }
    }
}

module.exports = mailer;
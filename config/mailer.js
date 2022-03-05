const nodemailer = require('nodemailer');

mailerConfig = {
    getMailer: () => {
        var otpEmail = process.env.otpEmail;
        var otpPass = process.env.otpPass;
        var transposter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: otpEmail,
                pass: otpPass
            }
        });
        console.log("trans created")
        return transposter;
    }
}


module.exports = {mailerConfig};
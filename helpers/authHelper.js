const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

var otpRange = {
    max: 999999,
    min: 100000,
};

var authHelper = {
    hashPassword: async(password) => {
        try {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);
        } catch (error) {
            throw new Error('hashing failed', error);
        }
    },

    comparePasswords: async(inputPassword, hashedPassword) => {
        try {
            return await bcrypt.compare(inputPassword, hashedPassword);
        } catch (error) {
            throw new Error('comparing failed', error);
        }
    },

    genOtp: () => {
        var num = Math.floor(Math.random()*(otpRange.max - otpRange.min + 1)) + otpRange.min;
        // var num = 111111;
        return num.toString();
    },

    generateAuthToken: async(user) => {
        return await jwt.encode(user, process.env.authSecret);
    },

    decodeAuthToken: async(token) => {
        return await jwt.decode(token, process.env.authSecret);
    }
}

module.exports = {authHelper};
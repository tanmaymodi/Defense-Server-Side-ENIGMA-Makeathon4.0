const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { authHelper } = require('../helpers/authHelper');

var checkAuth = async(req, res, next) => {
    try {
        console.log(req.cookies);
        const token = req.headers.authorization || req.cookies.authtoken;
        
        if (token) {
            const decoded = await authHelper.decodeAuthToken(token);
            if (decoded) {
                // console.log("decoded", decoded);
                const user = await User.findOne({ email: decoded.email });

                if(user === null){
                    throw {status: 401, err: "Invalid email"};
                }
                // console.log("user", user);
                req.user = user
            } else {
                throw {status: 401, err: "Authorization error"};
            }
            
        } else {
            throw {status: 401, err: "Authorization error"};
        }
        next()
        
    } catch (err) {
        console.log("checkauth err -- ", err);
        return res.status(err.status || 500).json({ success: false, err: err.err || "Server error", msg: 'Trouble in authenticating you!' });
    }
}


module.exports = checkAuth;
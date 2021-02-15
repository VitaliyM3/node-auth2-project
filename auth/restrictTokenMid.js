const jwt = require('jsonwebtoken');
const secret = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    // const secret = process.env.JWT_SECRET || "keep it secret, keep it safe";

    if (authorization) {
        jwt.verify(authorization, secret.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "Invalid Credentials" });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(400).json({ message: "No credentials provided this is from res token MW" });
    }
};
const express = require('express');

const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');
const restricted = require('../auth/restrictTokenMid.js');

const server = express();

server.use(express.json());


server.use('/api', usersRouter);
server.use('/api/auth', authRouter);


server.get("/", (req, res) => {
    res.json({ api: "running" });
});

module.exports = server;

function checkRole(role) {
    return (req, res, next) => {
        if(req.decodedToken && 
            req.decodedToken.role && 
            req.decodedToken.toLowerCase() === role
            ) {
                next();
        } else {
            res.status(403).json({ message: "You shall not pass!" });
        }
    };
}
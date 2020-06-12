const express = require('express');
const session = require('express-session');

const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');

const server = express();

const sessionConfig = {
    name: "Apple",
    secret: "This is my secret",
    cookie: {
        maxAge: 1000 * 20,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
};


server.use(express.json());
server.use(session(sessionConfig));

server.use('/api', usersRouter);
server.use('/api/auth', authRouter);


server.get("/", (req, res) => {
    res.json({ api: "running" });
});

module.exports = server;
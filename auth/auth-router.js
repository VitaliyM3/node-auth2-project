const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // added this import for jwt token

const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js'); // imported the secrets file for the secret part of jwt
const resToken = require('./restrictTokenMid.js');

router.get('/users', resToken, (req, res) => {  // added the resToken Middleware to restrict access to users unless you have a token
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.send(err);
    })
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user); // this is making a token based on the function below

            res.status(200).json({ 
                message: `Welcome ${user.username}!`,
                token, // this is where we add the token
            })
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

function generateToken(user) {
    const payload = {
        subject: user.id, //sub
        username: user.username,
        role: user.role || 'user'
        // ... other data
    };
    // const secret = 'this is my secure secret';  we imported our secret instead of writing it inline
    const options = {
        expiresIn: '8h',
    };

    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('./../../config/keys');

const User = require('./../../models/User');
const passport = require('passport');
const userRegistrationValidator = require('./../../validations/registration');
const userLoginValidator = require('./../../validations/login');

//user api
router.get('/test', (req, res) => {
    res.json({ msg: "user works" });
})

router.post('/register', (req, res) => {
    const validations = userRegistrationValidator(req.body);
    if(!validations.isValid) {
        return res.status(400).json({errors: validations.errors});
    }
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ 'msg': 'email already exists' });
        }
        const avatar = gravatar.url(req.body.avatar, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                newUser.save().then((user) => {
                    res.json(user);
                }).catch(err => {
                    throw err;
                })
            })
        })
    })
})


router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //validaitons

    const { errors, isValid } = userLoginValidator(req.body);
    if(!isValid) {
        return res.status(400).json({errors: errors});
    }
    //find user by email
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            return res.status(404).json({ 'msg': 'user not found' });
        }
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // jwt payload
                const payload = { id: user.id, name: user.name, avatar: user.avatar };
                jwt.sign(payload, keys.secretKey, { expiresIn: 3600 }, (err, token) => {
                    res.json({ success: true, token: 'Bearer ' + token });
                });
            }
            else {
                res.status(400).json({ 'msg': 'incorrect password' });
            }
        })
    })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;
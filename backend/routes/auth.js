var express = require("express");
var router = express.Router();
var passport = require("passport");
const bcrypt = require("bcryptjs");
const { authenticate } = require("passport");
mango = require('../db')

router.post("/regis", (req, res, next) => {
    console.log('made it to auth.js register')
    console.log(req.body)
    User = mango.get().db('app').collection('users')
    User.findOne({ "name": req.body.name })
        .then(user => {
            console.log('made it to findOne', user)
            if (user !== null) {
                console.log('user id already found')
                res.status(401).json({ message: `Already a user with username: ${req.body.name}` })
            }
            else {
                console.log('creating new user')
                const newUser = ({
                    name: req.body.name,
                    password: req.body.password
                });
                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        User.insertOne(newUser)
                            .then(user => {
                                console.log('saved', user)
                                return res.json(user);
                            })
                            .catch(err => {
                                console.log('savefail', err)
                                return res.json(err);
                            });
                    });
                });
            }
        })
        .catch(err => {
            console.log('dberror', err)
        })

});

router.post("/login", (req, res, next) => {
    console.log('made it to auth.js/login')
    if (req.isAuthenticated()) {
        return res.status(402).json({ message: 'already logged in' })
    }

    passport.authenticate("local", function (err, user, info) {
        console.log(err, user, info)
        if (err) {
            return res.status(401).json({ errors: err });
        }
        if (user === false || user === null) {
            return res.status(402).json({ message: `No user found` })
        }
        console.log('after auth', user)
        req.logIn(user, function (err) {
            if (err) {
                console.log(err)
                return res.status(403).json({ errors: err });
            }
            console.log('at login')
            console.log(user)
            console.log(req.session)
            console.log(req.sessionID)
            return res.status(200).json({ success: `logged in ${user.name}` });
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


router.post("/logged", (req, res) => {
    console.log('made it to auth.js/login')
    if (req.isAuthenticated()) {
        return res.status(200).json({ message: 'logged in' })
    }
    else
    return res.status(403).json({ message: 'not logged in' })
})
    module.exports = router;
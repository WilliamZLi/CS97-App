const bcrypt = require("bcryptjs");
const passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mango = require('../db')
var ObjectId = require('mongodb').ObjectID;

passport.serializeUser((user, done) => {
    // console.log('serializng')
    // console.log(user)
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    // console.log('deserializng')
    User = mango.get().db('app').collection('users')
    // console.log('set user', id)
    User.findOne({ "_id": new ObjectId(id) })
        .then(user => {
            // console.log(user)
            done(null, user);
        })
        .catch(err => {
            // console.log(err)
            done(err, null);
        })
});

passport.use(
    new LocalStrategy({ usernameField: "name" }, (name, password, done) => {
        // Match User
        User = mango.get().db('app').collection('users')
        User.findOne({ "name": name })
            .then(user => {
                // check out user
                // console.log('localstrat')
                // console.log(user)
                if (user === null) {
                    // console.log('null usr, returning false')
                    return done(null, false, { message: 'User not found' })
                } else {
                    // console.log('usr found')
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            // console.log('usr math')
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Wrong password" });
                        }
                    });
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    })
);

module.exports = passport;
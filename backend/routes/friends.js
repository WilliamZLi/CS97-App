express = require('express')
router = express.Router();
var mango = require('../db')
var ObjectId = require('mongodb').ObjectID;

router.post('/pendfriend', function (req, res) {
    console.log("made it to friend", req.body); // in theory only can view after login, so no need for check

    Query = mango.get().db('app').collection('users');
    Query.findOne({ _id: new ObjectId(req.session.passport.user) }) // return user  
        .then(user => {
            console.log("curr user got");
            console.log(user);
            Query.updateOne({ _id: new ObjectId(req.session.passport.user) }, { $push: { throwFriends: req.body } }, { upsert: true })
                .then(s1succ => { // add pending to both inviter and invitee
                    Query.updateOne({ _id: new ObjectId(req.body) }, { $push: { catchFriends: req.session.passport.user } }, { upsert: true })
                        .then(s2succ => {
                            res.json({ message: "friend req successful" })
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(401).json({ message: `Error in requesting friend` });
                        })
                })
                .catch(err => {
                    console.log(err);
                    res.status(401).json({ message: `Error in requesting friend` });
                })
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `??? Error in friend` });
        })
})

router.post('/showfriend', function (req, res) {
    console.log("made it to friendreq", req.body); // in theory only can view after login, so no need for check

    Query = mango.get().db('app').collection('users');
    Query.findOne({ _id: new ObjectId(req.session.passport.user) }, { projection: { name: 1, friends: 1, throwFriends: 1, catchFriends: 1 } }) // get current user  
        .then(user => {
            console.log(req.session)
            console.log("curr user got");
            console.log(user);
            res.json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `No friendreq error?` });
        })
})

module.exports = router;
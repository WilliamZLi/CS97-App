express = require('express')
router = express.Router();
var mango = require('../db')
var ObjectId = require('mongodb').ObjectID;

router.post('/addfriend', async function (req, res) {
    console.log("made it to friend", req.body); // in theory only can view after login, so no need for check
    Query = mango.get().db('app').collection('users');
    await Query.findOne({ _id: new ObjectId(req.session.passport.user) }) // return user, assumed to exist, but check just in cast
        .then(user => {
            console.log("curr user got");
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `??? Error in friend` });
        })
    await Query.updateOne({ _id: new ObjectId(req.session.passport.user) }, { $push: { throwFriends: req.body.id } }, { upsert: true })
        .then(succ => { console.log('update successful') })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `Error in requesting friend` });
        })
    await Query.updateOne({ _id: new ObjectId(req.body.id) }, { $push: { catchFriends: req.session.passport.user } }, { upsert: true })
        .then(s2succ => {
            res.json({ message: "friend req successful" })
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `Error in requesting friend` });
        })
})

router.post('/unfriend', async function (req, res) {
    console.log("made it to friend", req.body); // in theory only can view after login, so no need for check
    Query = mango.get().db('app').collection('users');
    await Query.findOne({ _id: new ObjectId(req.session.passport.user) }) // return user, assumed to exist, but check just in cast
        .then(user => {
            console.log("curr user got");
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `??? Error in friend` });
        })
    await Query.updateOne({ _id: new ObjectId(req.session.passport.user) }, { $pull: { friends: req.body.id } }, { upsert: true })
        .then(succ => { console.log('update successful') })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `Error in requesting friend` });
        })
    await Query.updateOne({ _id: new ObjectId(req.body.id) }, { $pull: { friends: req.session.passport.user } }, { upsert: true })
        .then(s2succ => {
            res.json({ message: "ufriend successful" })
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `Error in requesting friend` });
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

router.post('/undorequest', async function (req, res) {
    console.log("made it to undo friend request", req.body); // in theory only can view after login, so no need for check
    Query = mango.get().db('app').collection('users');
    await Query.findOne({ _id: new ObjectId(req.session.passport.user) }) // return user, assumed to exist, but check just in cast
        .then(user => {
            console.log("curr user got");
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `??? Error in friend` });
        })
    await Query.updateOne({ _id: new ObjectId(req.session.passport.user) }, { $pull: { throwFriends: req.body.id } }, { upsert: true })
        .then(succ => { console.log('update successful') })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `Error in requesting friend` });
        })
    await Query.updateOne({ _id: new ObjectId(req.body.id) }, { $pull: { catchFriends: req.session.passport.user } }, { upsert: true })
        .then(s2succ => {
            res.json({ message: "friend delete successful" })
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `Error in requesting friend` });
        })
})

router.post('/acceptreq', async function (req, res) {
    console.log("made it to accept friend request", req.body); // in theory only can view after login, so no need for check
    Query = mango.get().db('app').collection('users');
    await Query.findOne({ _id: new ObjectId(req.session.passport.user) }) // this is who caught request
        .then(user => {
            console.log("curr user got");
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `??? Error in friend` });
        })
    await Query.updateOne({ _id: new ObjectId(req.session.passport.user) }, { $pull: { catchFriends: req.body.id }, $push: { friends: req.body.id } }, { upsert: true })
        .then(succ => { console.log('update successful') }) // remove pending from own catch pile
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `Error in requesting friend` });
        })
    await Query.updateOne({ _id: new ObjectId(req.body.id) }, { $pull: { throwFriends: req.session.passport.user }, $push: { friends: req.session.passport.user } }, { upsert: true })
        .then(s2succ => {
            res.json({ message: "friend accept successful" }) // remove from their throw pile
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `Error in requesting friend` });
        })
})

router.post('/rejectreq', async function (req, res) {
    console.log("made it to reject friend request", req.body); // in theory only can view after login, so no need for check
    Query = mango.get().db('app').collection('users');
    await Query.findOne({ _id: new ObjectId(req.session.passport.user) }) // this is who caught request
        .then(user => {
            console.log("curr user got");
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `??? Error in friend` });
        })
    await Query.updateOne({ _id: new ObjectId(req.session.passport.user) }, { $pull: { catchFriends: req.body.id } }, { upsert: true })
        .then(succ => { console.log('update successful') }) // remove pending from own catch pile
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `Error in requesting friend` });
        })
    await Query.updateOne({ _id: new ObjectId(req.body.id) }, { $pull: { throwFriends: req.session.passport.user } }, { upsert: true })
        .then(s2succ => {
            res.json({ message: "friend reject successful" }) // remove from their throw pile
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: `Error in requesting friend` });
        })
})

module.exports = router;
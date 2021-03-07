express = require('express')
router = express.Router();
var mango = require('../db')
var ObjectId = require('mongodb').ObjectID;

    // Search post database for post id
    router.post('/fetch', async function (req, res) {
        console.log("made it to post router")
        console.log(req.body.id)

        const proj = {
            projection: { _id: 1, caption: 1, photo: 1, uploader: 1, date: 1, comments: 1}
        }

        PostCol = mango.get().db('test').collection('col');
        PostCol.findOne({ _id: new ObjectId(req.body.id) }, proj)
            .then(post => {
                console.log(post)
                if (post !== null) {
                    console.log("found matching post")
                    console.log(post)
                    res.json(post)
                }
                else {
                    console.log("couldn't find the post")
                    res.status(401).json()
                }
            })
            .catch(err => {
                console.log("Post backend error");
                res.status(401).json(err.message);
            })

    });

    // Add a comment to the post
    router.post('/addcomment', async function (req,res) {
        console.log("made it to add comment", req.body)
        PostCol = mango.get().db('test').collection('col')
        names = mango.get().db('app').collection('users')

        var userId = req.session.passport.user  // current user
        var userName = ''

        // turn userId into userName
        await names.findOne({ _id: new ObjectId(userId) }, { projection: { name: 1 }} )
            .then(result => {
                console.log("found session user")
                console.log(result.name)
                userName = result.name
            })
            .catch(err => {
                console.log(err)
            })
        console.log("username", userName)

        var comment = {
            user: userName,
            comment: req.body.comment,
        }

        await PostCol.findOne({ _id: ObjectId(req.body.id) })
            .then(post => {
                console.log("curr post got");
            })
            .catch(err => {
                console.log(err);
                res.status(401).json({ message: `??? Error in post` });
            })
        await PostCol.updateOne({ _id: new ObjectId(req.body.id) }, { $push: { comments: comment } }, { upsert: true} )
            .then(succ => { 
                console.log('update successful')
                res.json(succ)
            })
            .catch(err => {
                console.log(err)
                res.status(401).json({ message: `Error in adding comment`})
            })
        
    });




    
    module.exports = router;

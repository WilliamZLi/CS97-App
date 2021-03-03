express = require('express')
router = express.Router();
var mango = require('../db')
var ObjectId = require('mongodb').ObjectID;

    // Search post database for post id
    router.post('/', async function (req, res) {
        console.log("made it to post router")
        console.log(req.body.id)

        const proj = {
            projection: { _id: 1, caption: 1, photo: 1, uploader: 1, date: 1}
        }

        PostCol = mango.get().db('test').collection('col');
        PostCol.findOne({ "_id": ObjectId(req.body.id) }, proj)
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

    })


    
    module.exports = router;

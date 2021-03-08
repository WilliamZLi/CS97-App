express = require('express')
router = express.Router();
var mango = require('../db')
var ObjectId = require('mongodb').ObjectID;

// Search user database for matching username
router.post('/user', (req, res) => {
  // console.log("made it to search.js");
  // console.log(req.body);      // holds the search string

  UserCol = mango.get().db('app').collection('users');
  UserCol.findOne({ "name": req.body.query }, { projection: { name: 1 } }) // return only name + friends array   
    .then(user => {
      // console.log("made it to find");
      // console.log(user);
      if (user !== null) {
        // console.log("found matching user");
        res.json(user);
      }
      else {
        // console.log("no matching user found");
        res.status(204).json();
      }
    })
    .catch(err => {
      // console.log("Search backend error");
      res.status(401).json({ message: "Search backend error" });
    })
});

// Search post database for matching caption (by keyword)
router.post('/post', async function (req, res) {
  // console.log("made it to search user");
  // console.log(req.body.query);      // holds the search string

  // Search the post collection for captions with matching keywords
  PostCol = mango.get().db('test').collection('col');
  User = mango.get().db('app').collection('users');
  const options = {
    // sort returned docs in ascending order by caption
    sort: { caption: 1 },
    // include the caption,
    projection: { _id: 1, caption: 1, photo: 1, uploader: 1 },
  }

  PostCol.createIndex({ caption: "text" });
  var postMatch = await PostCol.find({ $text: { $search: req.body.query } }, options).toArray();
  var friendArr = []
  try {
    if (postMatch.length !== 0) {
      // console.log("at least 1 matching caption");
      // console.log(postMatch);
    }
    else {
      // console.log("no matching caption found");
      // console.log(postMatch)
    }
  }
  catch (err) {
    // console.log("Search backend error");
    res.status(401).json(err.message);
  }
  await User.findOne({ _id: new ObjectId(req.session.passport.user) }, { projection: { friends: 1 } })
    .then(succ => {
      // console.log(succ.friends)
      if (succ.friends !== undefined)
        friendArr = succ.friends
      else
        friendArr = []
    })
    .catch(err => {
      // console.log("Search backend error");
      res.status(401).json(err.message);
    })
  friendArr.push(req.session.passport.user) // allow seeing own posts
  // console.log(friendArr)
  // console.log(postMatch)
  var filteredPosts = [];
  for (var i in postMatch) {
    if (friendArr.includes(postMatch[i].uploader + '')) { // '' to convert ObjectId to string
      filteredPosts.push(postMatch[i]) // only if valid friends do we show image
    }
  }
  res.json(filteredPosts) //return ok images

});

module.exports = router;

express = require('express')
multer = require('multer');
var mango = require('../db')
router = express.Router();
var ObjectId = require('mongodb').ObjectID;
const fs = require("fs");

var storage = multer.memoryStorage();
var uploadMem = multer({ storage: storage });
// CREATE Obj
router.route('/create-obj').post(uploadMem.single("photo"), (req, res) => {
  console.log('got to objcrea')
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: `Must be user to post` })
  }
  upld = mango.get().db('app').collection('users')
  col = mango.get().db('test').collection('col')
  data = {
    caption: req.body.caption,
    photo: req.file,
    uploader: req.user._id,
    date: new Date()
  }
  console.log('data', data)
  col.insertOne(data)
    .then(stat => {
      upld.updateOne({ _id: new ObjectId(req.session.passport.user) }, { $push: { posts: stat.insertedId } }, { upsert: true })
        .then(usr => {
          //console.log('session', req.session)
          console.log('insertid', stat.insertedId)
          res.json(stat)
        })
        .catch(err => {
          console.log(err)
          return next(err);
        })
    })
    .catch(err => {
      console.log(err)
      return next(err);
    })

  //console.log(req.user, req.session)

});

module.exports = router;

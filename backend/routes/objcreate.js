express = require('express')
multer = require('multer');
var mango = require('../db')
router = express.Router();
var ObjectId = require('mongodb').ObjectID;

var storage = multer.memoryStorage();
var uploadMem = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});
// CREATE Obj
router.route('/create-obj').post(uploadMem.single("photo"), (req, res) => {
  console.log('got to objcrea')
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: `Must be user to post` })
  }
  if(!req.file) {
    console.log('no file found')
    return res.status(401).json({ message: `File not supported format` })
  }
  upld = mango.get().db('app').collection('users')
  col = mango.get().db('test').collection('col')
  data = {
    caption: req.body.caption,
    photo: req.file.buffer,
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

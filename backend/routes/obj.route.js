express = require('express')
multer = require('multer');
var mango = require('../db')
router = express.Router();
var ObjectId = require('mongodb').ObjectID;

//setup image storage
var storage = multer.memoryStorage();
var upload = multer({ storage: storage, limits: { fileSize: 1000000 } })
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

// CREATE Obj
router.route('/create-obj').post(upload.single('photo'), (req, res, next) => {
  console.log('got to objcrea')
  console.log(req.body)
  console.log(req.user, req.session)
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: `Must be user to post` })
  }
  upld = mango.get().db('app').collection('users')
  col = mango.get().db('test').collection('col')
  data = {
    caption: req.body.name,
    photo: req.body.body,
    uploader: req.user._id,
    date: new Date()
  }
  console.log('data', data)
  col.insertOne(data)
    .then(stat => {
      upld.updateOne({ _id: new ObjectId(req.session.passport.user) }, { $push: { posts: stat.insertedId } }, {upsert: true})
        .then(usr => {
          console.log('session', req.session)
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
});

module.exports = router;

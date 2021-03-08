express = require('express')
multer = require('multer');
var mango = require('../db')
router = express.Router();
var ObjectId = require('mongodb').ObjectID;

var storage = multer.memoryStorage();
var uploadMem = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB?
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
}).single("photo")
// CREATE Obj
router.route('/create-obj').post((req, res) => {
  uploadMem(req, res, function (err) {
    if (err) {
      //console.log(err)
      return res.status(401).json({ message: `File must be smaller than 5MB!` })
    }
    else if (!req.file) {
      //console.log('no file found')
      return res.status(401).json({ message: `File not supported format` })
    }
    else {
      //console.log('got to objcrea')

      upld = mango.get().db('app').collection('users')
      col = mango.get().db('test').collection('col')
      data = {
        caption: req.body.caption,
        photo: req.file.buffer,
        uploader: req.user._id,
        date: new Date()
      }
      //console.log('data', data)
      col.insertOne(data)
        .then(stat => {
          upld.updateOne({ _id: new ObjectId(req.session.passport.user) }, { $push: { posts: stat.insertedId } }, { upsert: true })
            .then(usr => {
              //console.log('session', req.session)
              //console.log('insertid', stat.insertedId)
              res.json(stat)
            })
            .catch(err => {
              //console.log(err)
              return next(err);
            })
        })
        .catch(err => {
          //console.log(err)
          return next(err);
        })
    }
  })

  //console.log(req.user, req.session)

});

module.exports = router;

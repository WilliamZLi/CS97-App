express = require('express')
multer = require('multer');
var mango = require('../db')
router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var pictures = [];

// GET Obj
router.route('/get-obj').post(async function (req, res, next) {
  console.log('got to objgrab')

  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: `Must be user to grab` })
  }
  var pictures;
  picArr = []
  pitch = 0;
  upld = mango.get().db('app').collection('users')
  col = mango.get().db('test').collection('col')
  await User.findOne({ _id: new ObjectId(req.session.passport.user) }) // async calls -> will do one after another,
    .then(usr => { // .then executes only after call done, then moves on
      console.log(usr)
      if (usr.posts !== undefined) {
        pictures = usr.posts // if found, copy to array
      }
      else {
        pictures = [] //return resolution as empty array
      }
    })
    .catch(err => {
      console.log('findonecatch', err)
      return next(err)
    })
  await Promise.all(pictures.map(async (pictures) => {
    const picture = await col.findOne({ "_id": new ObjectId(pictures) });
    picArr.push(picture);
  }))
    .catch(err => {
      console.log('map throw', err)
      return next(err)
    })
  console.log('exited loop', pictures, pictures.length) 
  console.log('done', picArr)
  if (pictures.length !== 0) { //insurance, send empty if length 0
    console.log('sendoff')
    res.json(picArr) 
  }
  else
  {
    console.log('blanked')
    res.json([])
  }

  //console.log(req.user, req.session)

});


router.route('/profile-obj').post(async function (req, res, next) {
  console.log('got to profile objgrab')
  console.log(req.body)
  picArr = []
  pitch = 0;
  upld = mango.get().db('app').collection('users')
  col = mango.get().db('test').collection('col')
  await User.findOne({ _id: new ObjectId(req.body[0]) }, {projection:{ posts: 1}}) // async calls -> will do one after another,
    .then(usr => { // .then executes only after call done, then moves on
      console.log(usr)
      if (usr.posts !== undefined) {
        pictures = usr.posts // if found, copy to array
      }
      else {
        pictures = [] //return resolution as empty array
      }
    })
    .catch(err => {
      console.log('findonecatch', err)
      return next(err)
    })
  await Promise.all(pictures.map(async (pictures) => {
    const picture = await col.findOne({ "_id": new ObjectId(pictures) });
    picArr.push(picture);
  }))
    .catch(err => {
      console.log('map throw', err)
      return next(err)
    })
  console.log('exited loop', pictures, pictures.length) 
  console.log('done', picArr)
  if (pictures.length !== 0) {  // insurance, send empty if length 0
    console.log('sendoff')
    res.json(picArr) 
  }
  else
  {
    console.log('blanked')
    res.json([])
  }

  //console.log(req.user, req.session)

});

router.route('/favorite-obj').post(async function (req, res, next) {
  console.log('got to favorites objgrab')
  console.log(req.body)
  picArr = []
  pitch = 0;
  upld = mango.get().db('app').collection('users')
  col = mango.get().db('test').collection('col')
  await User.findOne({ _id: new ObjectId(req.body[0]) }, {projection:{ likeArray: 1}}) // async calls -> will do one after another,
    .then(usr => { // .then executes only after call done, then moves on
      console.log(usr)
      if (usr.likeArray !== undefined) {
        pictures = usr.likeArray // if found, copy to array
      }
      else {
        pictures = [] //return resolution as empty array
      }
    })
    .catch(err => {
      console.log('findonecatch', err)
      return next(err)
    })
  await Promise.all(pictures.map(async (pictures) => {
    const picture = await col.findOne({ "_id": new ObjectId(pictures) });
    picArr.push(picture);
  }))
    .catch(err => {
      console.log('map throw', err)
      return next(err)
    })
  console.log('exited loop', pictures, pictures.length) 
  console.log('done', picArr)
  if (pictures.length !== 0) {  // insurance, send empty if length 0
    console.log('sendoff')
    res.json(picArr) 
  }
  else
  {
    console.log('blanked')
    res.json([])
  }

  //console.log(req.user, req.session)

});

// router.route('/add-favorite-obj').post(async function (req, res, next) {
//   console.log("got to add favorite")

// });

module.exports = router;

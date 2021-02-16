express = require('express')
var mango = require('../db')
router = express.Router();



// CREATE Obj
router.route('/create-obj').post((req, res, next) => {
  console.log('got to objcrea')
  col = mango.get().db('test').collection('col')
  //console.log(req)
  console.log(req.user)
  col.insertOne(req.body)
    .then(stat => {
    console.log(req.session)
    req.session.destroy()
    res.json(stat)
    })
   .catch(err => {
    console.log(err)
    return next(err);
    })
});

module.exports = router;

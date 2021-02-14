express = require('express')
var mango = require('../db')
router = express.Router();



// CREATE Obj
router.route('/create-obj').post((req, res, next) => {
  col = mango.get().db('test').collection('col')
  console.log(req.body)
  col.insertOne(req.body)
    .then(stat => {
    res.json(stat)
    })
   .catch(err => {
    console.log(error)
    return next(err);
    })
});

module.exports = router;
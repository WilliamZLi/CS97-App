express = require('express')
const session = require('express-session');
var mango = require('../db')
router = express.Router();

router.get('/', function(req, res, next) {
    console.log(req.session)
    console.log('log route')

    res.json(req.session.user !== undefined ? true : false)
  });

module.exports = router;
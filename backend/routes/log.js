express = require('express')
const session = require('express-session');
var mango = require('../db')
router = express.Router();

router.post("/", (req, res, next) => {
    console.log(req.session)
    console.log('log route')
    var obj = {
      valid: req.session.passport.user !== undefined ? true : false, 
      id: req.session.passport.user
    }
    res.json(obj)
  });

module.exports = router;
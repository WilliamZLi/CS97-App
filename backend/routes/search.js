express = require('express')
router = express.Router();
var mango = require('../db')

router.post('/', function(req, res) {
    console.log("made it to search.js");
    console.log(req.body.query);      // holds the search string

    Query = mango.get().db('app').collection('users');
    Query.findOne({ "name": req.body.query })           // query users by name    
        .then(user => {
          console.log("made it to find");
          console.log(user);
          if (user !== null) {
            console.log("found matching user");
            res.status(200).json({ message: `Found matching user:  ${req.body.query}` });
          }
          else {
            console.log("no matching user found");
            res.status(401).json({ message: `No matching user with name: ${req.body.query}`});
          }
        });
  });

  module.exports = router;
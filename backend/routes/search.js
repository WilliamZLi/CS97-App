express = require('express')
router = express.Router();
var mango = require('../db')

  router.post('/', (req, res) => {
    console.log("made it to search.js");
    console.log(req.body.query);      // holds the search string

    UserCol = mango.get().db('app').collection('users');
    UserCol.findOne({ "name": req.body.query },{projection:{ name: 1}}) // return only name + friends array   
        .then(user => {
          console.log("made it to find");
          console.log(user);
          if (user !== null) {
            console.log("found matching user");
            res.json(user);
          }
          else {
            console.log("no matching user found");
            res.status(204).json();
          }
        })
        .catch(err => {
          console.log("Search backend error");
          res.status(401).json({ message: "Search backend error"});
        })
  });

  router.post('/post', async function(req, res) {
    console.log("made it to search user");
    console.log(req.body.query);      // holds the search string

    var matches = []; // holds all matches to the query

    // Search the post collection for captions with matching keywords
    PostCol = mango.get().db('test').collection('col');
    
    // Search the user collection for matching usernames
    UserCol = mango.get().db('app').collection('users');
    
    //var postMatch = await PostCol.find( { "caption": req.body.query } ,{projection:{ caption: 1}}).toArray();   // here, matches holds all matching posts
    
    PostCol.createIndex({ caption: "text" });
    var postMatch = await PostCol.find( { $text: { $search: req.body.query } } ,{projection:{ caption: 1}}).toArray();
    matches = postMatch;

    var userMatch = await UserCol.findOne({ "name": req.body.query },{projection:{ name: 1}}); // return only name + friends array
    if (userMatch) {
      matches.splice(0, 0, userMatch);
    }

    try {
      if (matches !== null) {
        console.log("at least 1 match");
        console.log(matches);
        res.json(matches);
      }
      else {
        console.log("no matching user nor caption");
        res.status(204).json();
      }
    }
    catch(err) {
      console.log("Search backend error");
      res.status(401).json(err.message);
    }
    
    
    console.log("made it past the finds");
  });



  module.exports = router;
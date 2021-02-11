var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<user>:<password>@cs97-cluster.gukdx.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
client.connect((err) => {
  if (err) return console.error(err);
  console.log('Connected to Database');
  const db = client.db('test');
  const coll = db.collection('col');
  router.post('/quotes', (req, res) => {
  coll.insertOne(req.body)
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
})
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ExpressVPN' });
});

module.exports = router;

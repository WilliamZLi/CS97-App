express = require('express')
const session = require('express-session');
var mango = require('../db')
router = express.Router();

router.use(function(req, res, next) {
    // set locals, only providing error in development
    console.log(req.session.user)
    console.log('middleware')
    if (req.session.user === undefined){
        res.redirect('/');
    }   else{
        next();
    }
})

// CREATE usr
router.route('/create-usr').post((req, res, next) => {
    col = mango.get().db('app').collection('users') // set collection to users
    var list = col.find({ "name": req.body.name }) // find if any matches name
    list.count() // if not zero, means already in database
        .then(ans => {
            console.log(ans) // log number
            if (ans === 0) { // if unique, store session and return
                col.insertOne(req.body)
                    .then(stat => { // after insertion, make username _id
                        req.session.user = req.body._id;
                        console.log(req.sessionID)
                        console.log(req.session)
                        req.session.save(err => {
                            if(err) return next(err)
                            else res.json(stat)
                        })
                          
                        
                    })
                    .catch(err => { // if insert error, return
                        console.log(err)
                        return next(err);
                    })
            }
            else {
                throw new Error('Need unique username!')
            }
        })
        .catch(err => { // if not unique, throw error
            console.log(err)
            return res.status(405).send(err);
        })

});

module.exports = router;

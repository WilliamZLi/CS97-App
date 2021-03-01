express = require('express')
multer = require('multer');
var mango = require('../db')
router = express.Router();
var ObjectId = require('mongodb').ObjectID;

// GET Obj
router.route('/getnames').post(async function (req, res, next) {
    const arrayList = [];
    const structure = req.body
    console.log('got to getnames', req.body)
    names = mango.get().db('app').collection('users')

    await Promise.all(structure.map(async (name) => {
        const person = await names.findOne({ "_id": new ObjectId(name) }, { projection: { name: 1 } });
        arrayList.push(person);
    }))
        .catch(err => {
            console.log('map throw', err)
            return next(err)
        })
    console.log('exited loop', arrayList, arrayList.length)
    res.json(arrayList)
});

module.exports = router;

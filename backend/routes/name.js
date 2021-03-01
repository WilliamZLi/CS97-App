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

router.route('/getname').post(async function (req, res, next) {
    const structure = req.body[0]
    console.log('got to getname', structure)
    if (ObjectId.isValid(structure)) {
        names = mango.get().db('app').collection('users')
        names.findOne({ _id: new ObjectId(structure) }, { projection: { name: 1 } })
            .then(resul => {
                console.log('valid obj',resul)
                if (resul === null) {
                    res.status(204).json()
                }
                else {
                    res.json(resul)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    else
    {
        res.status(204).json()
    }
});
module.exports = router;

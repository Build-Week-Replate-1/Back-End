const router = require('express').Router();
const bcrypt = require('bcryptjs');

const businessModel = require('./businessModel');
const hashFunction = require('../utils/hashFunction')

router.post('/register', (req, res, next) => {
    let user = {
        username: req.body.username,
        password: hashFunction(req.body.password),
        businessName: req.body.businessName,
        businessAddress: req.body.businessAddress,
        phoneNumber: req.body.phoneNumber,
        type: req.body.type
    };
    businessModel.add(user)
        .then(addedUser => {
            res.status(201).json({message: "User Successfully Created!", addedUser})
            next()
        })
        .catch(err =>{
            res.status(500).json({message: "Server Error", err})
        })
})



module.exports = router;
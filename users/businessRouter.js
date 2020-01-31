const router = require('express').Router();
const bcrypt = require('bcryptjs');

const businessModel = require('./businessModel');
const signToken = require('../utils/token-sign')
const hashFunction = require('../utils/hashFunction')

router.post('/register', (req, res, next) => {
    let user = {
        username: req.body.username,
        password: hashFunction(req.body.password),
        business_name: req.body.businessName,
        business_address: req.body.businessAddress,
        phone_number: req.body.phoneNumber,
        type: req.body.type
    };
    if(user.type === "donor" || user.type === "charity"){
        businessModel.add(user)
        .then(addedUser => {
            res.status(201).json({message: "User Successfully Created!", addedUser})
            next()
        })
        .catch(err =>{
            res.status(500).json({message: "Server Error", err})
        })
    } else {
        res.status(500).json({message: "please select donor or charity as your type of business and make sure all fields are filled out"})
    }
    
})

router.post('/login', (req, res, next) => {
    let {username, password} = req.body;

    businessModel.findBy({username})
        .first()
        .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){ 
            const token = signToken(user)
            res.status(200).json({message: "good job", token})
        } else {
            res.status(401).json({message: 'invalid login information try again'})
        }
        })
        .catch(err =>{
            res.status(500).json({message: "server error", err})
        })
})



module.exports = router;
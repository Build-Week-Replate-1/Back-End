const router = require('express').Router();
const bcrypt = require('bcryptjs');

const volunteerModel = require('./volunteersModel');
const signToken = require('../utils/token-sign')
const hashFunction = require('../utils/hashFunction')

router.post('/register', (req, res, next) => {
    let user = {
        username: req.body.username,
        password: hashFunction(req.body.password),
        phone_number: req.body.phone_number,
        volunteer_name: req.body.volunteer_name
    };
    volunteerModel.add(user)
        .then(addedUser => {
            res.status(201).json({message: "User Successfully Created!", addedUser})
        })
        .catch(err =>{
            res.status(500).json({message: "Server Error", err})
            console.log(user)
        })
})

router.post('/login', (req, res, next) => {
    let {username, password} = req.body;

    volunteerModel.findBy({username})
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
            console.log(err)
        })
})



module.exports = router;
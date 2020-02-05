const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt_decode = require('jwt-decode');

const businessModel = require('./businessModel');
const signToken = require('../utils/token-sign')
const hashFunction = require('../utils/hashFunction')

router.post('/register', (req, res, next) => {
    let user = {
        username: req.body.username,
        password: hashFunction(req.body.password),
        business_name: req.body.business_name,
        business_address: req.body.business_address,
        phone_number: req.body.phone_number,
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

router.put('/update', (req, res, next) => {
    let user = {
        username: req.body.username,
        business_name: req.body.business_name,
        business_address: req.body.business_address,
        phone_number: req.body.phone_number
    }
    const {token} = req.headers;
    var decoded = jwt_decode(token);
    if(!req.body.password && !req.body.type){
        if(decoded.type === "donor" || decoded.type === "charity"){
            businessModel.update(user, decoded.id)
            .then(updatedUser => {
                res.status(201).json({message: "User Successfully Updated!", updatedUser})
            })
            .catch(err =>{
                res.status(500).json({message: "Server Error", err})
            })
        } else {
            res.status(500).json({message: "You are not a business and cannot edit your user here visit /api/volunteer/update"})
        }
    }else{
        res.status(401).json({message: "you cannot update your password or business type sorry"})
    }
 
})

router.delete('/delete', (req, res, next) => {

    const {token} = req.headers;
    var decoded = jwt_decode(token);

    if(decoded.type === "donor" || decoded.type === "charity"){
        businessModel.remove(decoded.id)
        .then(removedUser => {
            res.status(201).json({message: "User Successfully Deleted!", removedUser})
        })
        .catch(err =>{
            res.status(500).json({message: "Server Error", err})
        })
    } else {
        res.status(500).json({message: "You are not a business and cannot delete your user here visit /api/volunteer/delete"})
    }
    
})

module.exports = router;
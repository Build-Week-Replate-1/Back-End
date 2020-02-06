const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt_decode = require('jwt-decode');

const volunteerModel = require('./volunteersModel');
const signToken = require('../utils/token-sign')
const hashFunction = require('../utils/hashFunction')
const authenticate = require('../utils/authenticate_middleware')

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
        })
})

router.get('/me', authenticate, (req, res) => {
    const {token} = req.headers;
    var decoded = jwt_decode(token);

    if(decoded.volunteer_name){
        volunteerModel.findById(decoded.id)
        .then(me => {
            if (me.length > 0){
                res.status(200).json(me.map(request => {
                    return {
                        id: request.id,
                        username: request.username,
                        phone_number: request.phone_number,
                        volunteer_name: request.volunteer_name,
                    }
                }))
            }
            else{
                res.status(400).json({message: "User not found"})
            }

        })
        .catch(err =>{
            res.status(500).json({message: "Server Error", err})
        })
    }else{
        res.status(500).json({message: "You are not a volunteer"}) 
    }

})

router.post('/login', (req, res, next) => {
    let {username, password} = req.body;

    volunteerModel.findBy({username})
        .first()
        .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            const signedInUser = {id: user.id,username: user.username, volunteer_name: user.volunteer_name}
            const token = signToken(user) 
            res.status(200).json({message: "good job", token, signedInUser})
        } else {
            res.status(401).json({message: 'invalid login information try again'})
        }
        })
        .catch(err =>{
            res.status(500).json({message: "server error", err})
            console.log(err)
        })
})

router.put('/update', authenticate, (req, res, next) => {
    let user = {
        username: req.body.username,
        volunteer_name: req.body.volunteer_name,
        phone_number: req.body.phone_number 
    }

    const {token} = req.headers;
    var decoded = jwt_decode(token);
    if(!req.body.password){
        if(decoded.volunteer_name){
            volunteerModel.update(user, decoded.id)
            .then(updatedUser => {
                res.status(201).json({message: "User Successfully Updated!", updatedUser})
            })
            .catch(err =>{
                res.status(500).json({message: "Server Error", err})
            })
        } else {
            res.status(500).json({message: "You are not a volunteer and cannot edit your user here visit /api/business/update"})
        }
    } else {
        res.status(401).json({message: "you cannot update your password sorry"})
    }


})

router.delete('/delete', authenticate, (req, res, next) => {

    const {token} = req.headers;
    var decoded = jwt_decode(token);
    
    if(decoded.volunteer_name){
        volunteerModel.remove(decoded.id)
        .then(removedUser => {
            res.status(201).json({message: "User Successfully Deleted!", removedUser})
        })
        .catch(err =>{
            res.status(500).json({message: "Server Error", err})
        })
    } else {
        res.status(500).json({message: "You are not a volunteer and cannot delete your user here visit /api/business/delete"})
    }
    
})



module.exports = router;
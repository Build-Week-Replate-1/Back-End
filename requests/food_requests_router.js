const router = require('express').Router();
const food_requests_model = require('./food_requests_model')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode');

router.get('/pending', (req, res) => {
    food_requests_model.pending()
        .then(pending => {
            res.status(200).json(pending.map(request => {
                return {
                    id: request.id,
                    type: request.type,
                    amount: request.amount,
                    pickup_time: `${moment(request.pickup_time).format('MMMM Do YYYY, h:mm:ss a')}`,
                    pending: `${request.pending === 1 ? 'true' : 'false'}`,
                    picked_up: `${request.picked_up === 1 ? 'true' : 'false'}`,
                    complete: `${request.complete === 1 ? 'true' : 'false'}`,
                    business_name: request.business_name
                }
            }))
            console.log(pending)
        })
        .catch(err =>{
            res.status(500).json({message: "Server Error", err})
        })
})

router.get('/item/:id', (req, res) => {
    const id = req.params.id
    food_requests_model.findById(id)
        .then(all => {
            if (all.length > 0){
                res.status(200).json(all.map(request => {
                    return {
                        id: request.id,
                        type: request.type,
                        amount: request.amount,
                        pickup_time: `${moment(request.pickup_time).format('MMMM Do YYYY, h:mm:ss a')}`,
                        pending: `${request.pending === 1 ? 'true' : 'false'}`,
                        picked_up: `${request.picked_up === 1 ? 'true' : 'false'}`,
                        complete: `${request.complete === 1 ? 'true' : 'false'}`,
                        business_name: request.business_name
                    }
                }))
            }
            else{
                res.status(400).json({message: "food request not found"})
            }

        })
        .catch(err =>{
            res.status(500).json({message: "Server Error", err})
        })
})

router.get('/all', (req, res) => {

    food_requests_model.all()
        .then(all => {
            res.status(200).json(all.map(request => {
                return {
                    id: request.id,
                    type: request.type,
                    amount: request.amount,
                    pickup_time: `${moment(request.pickup_time).format('MMMM Do YYYY, h:mm:ss a')}`,
                    pending: `${request.pending === 1 ? 'true' : 'false'}`,
                    picked_up: `${request.picked_up === 1 ? 'true' : 'false'}`,
                    complete: `${request.complete === 1 ? 'true' : 'false'}`,
                    business_name: request.business_name,
                    volunteer_id: request.volunteer_id
                }
            }))
        })
        .catch(err =>{
            res.status(500).json({message: "Server Error", err})
        })
})

router.get('/business/me', (req, res) => {
    const {token} = req.headers;
    var decoded = jwt_decode(token);

    if(decoded.type) {
        food_requests_model.business_me(decoded.id)
        .then(me => {
            res.status(200).json(me.map(request => {
                return {
                    id: request.id,
                    type: request.type,
                    amount: request.amount,
                    pickup_time: `${moment(request.pickup_time).format('MMMM Do YYYY, h:mm:ss a')}`,
                    pending: `${request.pending === 1 ? 'true' : 'false'}`,
                    picked_up: `${request.picked_up === 1 ? 'true' : 'false'}`,
                    complete: `${request.complete === 1 ? 'true' : 'false'}`,
                    business_name: request.business_name,
                    volunteer_name: request.volunteer_id
                }
            }))
        })
        .catch(err =>{
            res.status(500).json({message: "Server Error", err})
        })
    } else{
        res.status(401).json({
            message: "only businesses can acces this if you are a volunteer you can access your pickup requests at /api/requests/volunteers/me"
        })
    }

})

router.get('/volunteer/me', (req, res) => {
    const {token} = req.headers;
    var decoded = jwt_decode(token);

    if(!decoded.type) {
        food_requests_model.volunteer_me(decoded.id)
        .then(me => {
            res.status(200).json(me.map(request => {
                return {
                    id: request.id,
                    type: request.type,
                    amount: request.amount,
                    pickup_time: `${moment(request.pickup_time).format('MMMM Do YYYY, h:mm:ss a')}`,
                    pending: `${request.pending === 1 ? 'true' : 'false'}`,
                    picked_up: `${request.picked_up === 1 ? 'true' : 'false'}`,
                    complete: `${request.complete === 1 ? 'true' : 'false'}`,
                    business_name: request.business_name,
                    volunteer_name: request.volunteer_id
                }
            }))
        })
        .catch(err =>{
            res.status(500).json({message: "Server Error", err})
        })
    } else{
        res.status(401).json({
            message: "only volunteers can acces this if you are a business you can access your pickup requests at /api/requests/business/me"
        })
    }

})

router.post('/add', async (req, res) => {
    const {token} = req.headers;
    var decoded = jwt_decode(token)
    const request = {
        type: req.body.type,
        amount: req.body.amount,
        pickup_time: req.body.pickup_time,
        business_id: decoded.id,
        pending: true
    }
    if(decoded.type === "donor") {
        await food_requests_model.add(request)
            .then(request => {
                res.status(201).json({message: "success", request})
            })
            .catch(err =>{
                res.status(500).json({message: "server error", err})
                console.log(decoded)
            })
    } else{
        res.status(401).json({message: "you are not a business you cannot add a pickup request"})
    }
})

router.put('/update/:id', (req, res) => {
    const {token} = req.headers
    var decoded = jwt_decode(token)
    const id = req.params.id
    const request = req.body
    if(req.body){
        food_requests_model.update(request, id)
        .then(request => {
            if (request === 1){
              res.status(200).json({message: "success", request})  
            }
            else{
                res.status(400).json({message: "food request not found"})
            }
        })
        .catch(err =>{
            res.status(500).json({message: "server error", err})
            console.log(decoded)
        })
    }else{
        res.status(401).json({message: "you need to input something in the body"})
    }

})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    
    food_requests_model.remove(id)
        .then(request => {
            if(request === 1){
                res.status(200).json({message: `food request with id of ${req.params.id} has been deleted`})
            }
            else{
                res.status(400).json({message: "food request not found"})
            }
        })
        .catch(err =>{
            res.status(500).json({message: "Server Error", err})
        })
})
module.exports = router;
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
                    business_name: request.business_name
                }
            }))
        })
        .catch(err =>{
            res.status(500).json({message: "Server Error", err})
        })
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
                res.status(201).json({
                    
                    id: request.id,
                    type: request.type,
                    amount: request.amount,
                    pending: `${request.pending === 1 ? 'true' : 'false'}`,
                    picked_up: `${request.picked_up === 1 ? 'true' : 'false'}`,
                    complete: `${request.complete === 1 ? 'true' : 'false'}`,
                    business_name: request.business_name
                })

            })
            .catch(err =>{
                res.status(500).json({message: "server error", err})
                console.log(decoded)
            })
    } else{
        res.status(401).json({message: "you are not a business you cannot add a pickup request"})
    }

})
module.exports = router;
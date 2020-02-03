const router = require('express').Router();
const food_requests_model = require('./food_requests_model')

router.get('/pending', (req, res) => {
    food_requests_model.pending()
        .then(pending => {
            res.status(200).json({message: "successfully retrieved pending requests", pending})
            console.log(pending)
        })
        .catch(err =>{
            res.status(500).json({message: "Server Error", err})
        })
})

module.exports = router;
const cors = require('cors');
const helmet = require('helmet');
const express = require("express")
const middleware = [helmet(), cors(), express.json()]

const businessRouter = require('../users/businessRouter')
const volunteerRouter = require('../users/volunteersRouter')
const foodRequestsRouter = require('../requests/food_requests_router')

const authenticate = require('../utils/authenticate_middleware')

const server = express();

server.use(middleware)
server.use('/api/business', businessRouter)
server.use('/api/volunteer', volunteerRouter)
server.use('/api/requests', authenticate, foodRequestsRouter)

server.get("/", (req, res) => {
    res.status(200).json({success: "yes"})
})


module.exports = server
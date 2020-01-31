const cors = require('cors');
const helmet = require('helmet');
const express = require("express")
const middleware = [helmet(), cors(), express.json()]

const businessRouter = require('../users/businessRouter')
const volunteerRouter = require('../users/volunteersRouter')

const server = express();

server.use(middleware)
server.use('/api/business', businessRouter)
server.use('/api/volunteer', volunteerRouter)

server.get("/", (req, res) => {
    return("hello")
})


module.exports = server
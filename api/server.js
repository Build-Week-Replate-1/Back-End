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
    res.send("<h1>Replated API</h1><h3>By jacobcalv</h3>")
  })
  

module.exports = server
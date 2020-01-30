const cors = require('cors');
const helmet = require('helmet');
const express = require("express")
const middleware = [helmet(), cors(), express.json()]

const businessRouter = require('../users/businessRouter')

const server = express();

server.use(middleware)
server.use('/api/business', businessRouter)


module.exports = server
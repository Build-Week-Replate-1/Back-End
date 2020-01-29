const cors = require('cors');
const helmet = require('helmet');
const express = require("express")
const middleware = [helmet(), cors(), express.json()]

const server = express();

server.use(middleware)

module.exports = server
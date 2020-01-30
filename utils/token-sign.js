const jwt = require('jsonwebtoken')
require('dotenv').config()

function signToken(user) {
  if(user.businessName) {
    //business
    const payload = {
      username: user.username,
      businessName: user.businessName,
      type: user.type
    };

    const secret = process.env.JWT_SECRET
  
    const options = {
      expiresIn: "1hr"
    }
    return (jwt.sign(payload, secret, options))
  } else{
    //volunteer
    const payload = {
      username: user.username,
      volunteerName: user.volunteerName
    }

    const secret = process.env.JWT_SECRET
  
    const options = {
      expiresIn: "1hr"
    }
    return (jwt.sign(payload, secret, options))
  }

}

module.exports = signToken
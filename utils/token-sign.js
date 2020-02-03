require('dotenv').config()
const jwt = require('jsonwebtoken')

function signToken(user) {
  if(user.business_name) {
    //business
    const payload = {
      id: user.id,
      username: user.username,
      business_name: user.business_name,
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
      id: user.id,
      username: user.username,
      volunteer_name: user.volunteer_name
    }

    const secret = process.env.JWT_SECRET 
  
    const options = {
      expiresIn: "1hr"
    }
    return (jwt.sign(payload, secret, options))
  }

}

module.exports = signToken
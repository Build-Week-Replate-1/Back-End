const jwt = require('jsonwebtoken')

function signToken(user) {
  if(user.businessName) {
    //business
    const payload = {
      username: user.username,
      businessName: user.businessName,
      type: user.type
    };

    const secret = process.env.JWT_SECRET || 'apple orange grapes cake'
  
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

    const secret = process.env.JWT_SECRET || 'apple orange grapes cake'
  
    const options = {
      expiresIn: "1hr"
    }
    return (jwt.sign(payload, secret, options))
  }

}

module.exports = signToken
const bcrypt = require('bcryptjs');

const hashFunction = (password) => {
    const hash = bcrypt.hashSync(password, 10);
    return(hash)
}

module.exports = hashFunction
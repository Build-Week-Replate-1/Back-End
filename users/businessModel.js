const db = require('../database/dbconfig')

module.exports = {
    add,
    findBy
};

function findBy(param) {
    return db('businesses').where(param)
};

function findById(id) {
    return db("businesses")
      .where({ id })
      .first()
}

function add(user) {
    return db("businesses")
        .insert(user)
        .returning('*')
}


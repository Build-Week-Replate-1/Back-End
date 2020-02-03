const db = require('../database/dbconfig')

module.exports = {
    add,
    findBy,
    findById
};

function findBy(param) {
    return db('volunteers').where(param)
};

function findById(id) {
    return db("volunteers")
      .where(id)
      .select()
      .first()
  }

function add(user) {
    return db("volunteers")
        .insert(user)
        .returning('*')
}

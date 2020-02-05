const db = require('../database/dbconfig')

module.exports = {
    add,
    findBy,
    findById,
    update,
    remove
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

function update(user, id) {
    return db("volunteers")
        .update(user)
        .where("id", id)
}

function remove(id) {
    return db("volunteers")
        .where("id", id)
        .del()
}
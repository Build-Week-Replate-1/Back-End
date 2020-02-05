const db = require('../database/dbconfig')

module.exports = {
    add,
    findBy,
    findById,
    update,
    remove
};

function findBy(param) {
    return db('businesses').where(param)
};

function findById(id) {
    return db("businesses")
      .where("id", id)
}

function add(user) {
    return db("businesses")
        .insert(user)
        .returning('*')
}

function update(user, id) {
    return db("businesses")
        .update(user)
        .where("id", id)
}

function remove(id) {
    return db("businesses")
        .where("id", id)
        .del()
}
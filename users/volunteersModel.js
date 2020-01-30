const db = require('../database/dbConfig')

module.exports = {
    add,
    findBy
};

function findBy(param) {
    return db('volunteers').where(param)
};

function findById(id) {
    return db("volunteers")
      .where({ id })
      .first()
  }

async function add(user) {
    const [id] = await db('volunteers')
        .insert(user)
    return findById(id)
}

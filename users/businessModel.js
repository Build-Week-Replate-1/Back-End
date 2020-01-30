const db = require('../database/dbConfig')

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

async function add(user) {
    const [id] = await db('businesses')
        .insert(user)
    return findById(id)
}

const db = require('../database/dbconfig')

module.exports = {
    add,
    findBy,
    all,
    pending
};

function add(request) {
    return db("food_requests")
        .insert(request)
        .returning('*')
}

function findBy(param) {
    return db('food_requests').where(param)
};

function all() {
    return db("food_requests")
        .returning('*')
}

function pending() {
    return db("food_requests as f")
        .where('pending', 1)
        .join('businesses as b', 'f.business_id', '=', 'b.id')
        .join('volunteers as v', 'f.volunteer_id', '=', 'v.id')
        .select('f.id', 'f.type', 'f.amount',' f.pickup_time', 'f.pending', 'f.picked_up', 'f.complete', 'b.business_name', 'v.volunteer_name')
}
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
    return db("food_requests as f")
        .join('businesses as b', 'f.business_id', '=', 'b.id')
        .select('f.id', 'f.type', 'f.amount',' f.pickup_time', 'f.pending', 'f.picked_up', 'f.complete', 'b.business_name')
}

function pending() {
    return db("food_requests as f")
        .join('businesses as b', 'f.business_id', '=', 'b.id')
        .select('f.id', 'f.type', 'f.amount',' f.pickup_time', 'f.pending', 'f.picked_up', 'f.complete', 'b.business_name')
        .where("pending", 1)
}
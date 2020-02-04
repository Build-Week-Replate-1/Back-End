const db = require('../database/dbconfig')

module.exports = {
    add,
    findBy,
    all,
    pending,
    business_me,
    volunteer_me
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

function business_me(id) {
    return db("food_requests as f")
        .join('businesses as b', 'f.business_id', '=', 'b.id')
        .select('f.id', 'f.type', 'f.amount',' f.pickup_time', 'f.pending', 'f.picked_up', 'f.complete', 'b.business_name', 'f.volunteer_id')
        .where("business_id", id)
}

function volunteer_me(id) {
    return db("food_requests as f")
        .join('businesses as b', 'f.business_id', '=', 'b.id')
        .select('f.id', 'f.type', 'f.amount',' f.pickup_time', 'f.pending', 'f.picked_up', 'f.complete', 'b.business_name', 'f.volunteer_id')
        .where("volunteer_id", id)
}
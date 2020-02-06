const db = require('../database/dbconfig')

module.exports = {
    add,
    findBy,
    findById,
    all,
    pending,
    business_me,
    volunteer_me,
    update,
    remove
};

function add(request) {
    return db("food_requests")
        .insert(request)
        .returning('*')
}

function findById(id) {
    return db("food_requests as f")
        .select('f.id', 'f.type', 'f.amount',' f.pickup_time', 'f.pending', 'f.picked_up', 'f.complete', 'f.business_id', 'b.business_name', 'f.volunteer_id')
        .join('businesses as b', 'f.business_id', '=', 'b.id')
        .where('f.id', id)
};

function findBy(param) {
    return db("food_requests as f")
        .select('f.id', 'f.type', 'f.amount',' f.pickup_time', 'f.pending', 'f.picked_up', 'f.complete', 'f.business_id', 'b.business_name', 'f.volunteer_id')
        .join('businesses as b', 'f.business_id', '=', 'b.id')
        .where(param)
};

function all() {
    return db("food_requests as f")
        .select('f.id', 'f.type', 'f.amount',' f.pickup_time', 'f.pending', 'f.picked_up', 'f.complete', 'f.business_id', 'b.business_name', 'f.volunteer_id')
        .join('businesses as b', 'f.business_id', '=', 'b.id')
}

function pending() {
    return db("food_requests as f")
        .select('f.id', 'f.type', 'f.amount',' f.pickup_time', 'f.pending', 'f.picked_up', 'f.complete', 'f.business_id', 'b.business_name', 'f.volunteer_id')
        .join('businesses as b', 'f.business_id', '=', 'b.id')
        .where("pending", 1)
}

function business_me(id) {
    return db("food_requests as f")
        .select('f.id', 'f.type', 'f.amount',' f.pickup_time', 'f.pending', 'f.picked_up', 'f.complete', 'f.business_id', 'b.business_name', 'f.volunteer_id')
        .join('businesses as b', 'f.business_id', '=', 'b.id')
        .where("business_id", id)
}

function volunteer_me(id) {
    return db("food_requests as f")
        .select('f.id', 'f.type', 'f.amount',' f.pickup_time', 'f.pending', 'f.picked_up', 'f.complete', 'f.business_id', 'b.business_name', 'f.volunteer_id')
        .join('businesses as b', 'f.business_id', '=', 'b.id')
        .where("volunteer_id", id)
}

function update(request, id) {
    return db("food_requests")
        .update(request)
        .where("id", id)
}

function remove(id) {
    return db("food_requests")
        .where("id", id)
        .del()
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('food_requests').del()
    .then(function () {
      // Inserts seed entries
      return knex('food_requests').insert([
        {       
          type: "chicken breasts",
          amount: 7,
          pickup_time: new Date(Date.now()),
          business_id: '1'
        }
      ]);
    });
};

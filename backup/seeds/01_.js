const hashFunction = require('../../utils/hashFunction')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('volunteers').del()
    .then(function () {
      return knex('volunteers').insert([
        {       
          username: "jake",
          password: hashFunction("123"),
          phone_number: "123456789",
          volunteer_name:	"Ronaldos Convience"
        }
      ]);
    });
};

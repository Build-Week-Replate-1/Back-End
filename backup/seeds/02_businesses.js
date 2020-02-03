
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('businesses').del()
    .then(function () {
      // Inserts seed entries
      return knex('businesses').insert([
        {       
          username: "georgieporgie01",
          password: "123",
          business_name:	"Georgie Porgie's",
          business_address:	"123 Test St",
          phone_number: "1234567789",
          type: "donor"
        },
        {       
          username: "feedUSA",
          password: "123",
          business_name:	"Feeding America Southeast",
          business_address:	"123 Test St",
          phone_number: "1234567789",
          type: "charity"
        }
      ]);
    });
};

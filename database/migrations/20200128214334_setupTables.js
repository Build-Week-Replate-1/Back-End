
exports.up = function(knex) {
  return(
    knex.schema
      .createTable('volunteers', volunteers => {
          volunteers.increments();

          volunteers.string("username",255).notNullable().unique();
          volunteers.string("password",255).notNullable();
          volunteers.string("phoneNumber",255).notNullable();
          volunteers.string("volunteerName",255).notNullable();

      })
      .createTable('businesses', business => {
          business.increments();

          business.string("username",255).notNullable().unique();
          business.string("password",255).notNullable();
          business.string("businessName",255).notNullable();
          business.string("businessAddress",255).notNullable();
          business.string("phoneNumber",255).notNullable();
          business.string("type",255).notNullable();
      })
      .createTable('foodRequests', foodRequest => {
          foodRequest.increments();

          foodRequest.string("type",255).notNullable();
          foodRequest.integer("amount").notNullable();
          foodRequest.date("pickupTime").notNullable();
          foodRequest.boolean("pending").defaultTo(true);
          foodRequest.boolean("pickedUp").defaultTo(false);
          foodRequest.boolean("complete").defaultTo(false);
          foodRequest.integer("businessId",255).unsigned().notNullable().references('id').inTable('businesses').onUpdate("CASCADE").onDelete("CASCADE");
          foodRequest.integer("volunteerId",255).unsigned().notNullable().references('id').inTable('volunteers');
      })

  )
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('foodRequests')
    .dropTableIfExists('businesses')
    .dropTableIfExists('volunteers')
};

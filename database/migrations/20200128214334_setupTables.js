
exports.up = function(knex) {
  return(
    knex.schema
      .createTable('volunteers', volunteers => {
          volunteers.increments();

          volunteers.string("username",255).notNullable().unique();
          volunteers.string("password",255).notNullable();
          volunteers.string("phone_number",255).notNullable();
          volunteers.string("volunteer_name",255).notNullable();

      })
      .createTable('businesses', business => {
          business.increments();

          business.string("username",255).notNullable().unique();
          business.string("password",255).notNullable();
          business.string("business_name",255).notNullable();
          business.string("business_address",255).notNullable();
          business.string("phone_number",255).notNullable();
          business.string("type",255).notNullable();
      })
      .createTable('foodRequests', foodRequest => {
          foodRequest.increments();

          foodRequest.string("type",255).notNullable();
          foodRequest.integer("amount").notNullable();
          foodRequest.date("pickup_time").notNullable();
          foodRequest.boolean("pending").defaultTo(true);
          foodRequest.boolean("pickedUp").defaultTo(false);
          foodRequest.boolean("complete").defaultTo(false);
          foodRequest.integer("business_id",255).unsigned().notNullable().references('id').inTable('businesses').onUpdate("CASCADE").onDelete("CASCADE");
          foodRequest.integer("volunteer_id",255).unsigned().notNullable().references('id').inTable('volunteers');
      })

  )
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('foodRequests')
    .dropTableIfExists('businesses')
    .dropTableIfExists('volunteers')
};

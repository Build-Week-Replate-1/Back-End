
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
        .createTable('food_requests', request => {
            request.increments();
  
            request.string("type",255).notNullable();
            request.integer("amount").notNullable();
            request.dateTime("pickup_time").notNullable();
            request.boolean("pending").defaultTo(true);
            request.boolean("picked_up").defaultTo(false);
            request.boolean("complete").defaultTo(false);
            request.integer("business_id").unsigned().notNullable().references('id').inTable('businesses').onUpdate("CASCADE").onDelete("CASCADE");
            request.integer("volunteer_id").unsigned().references('id').inTable('volunteers');
        })
    )
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('food_requests')
      .dropTableIfExists('businesses')
      .dropTableIfExists('volunteers')
  };
  
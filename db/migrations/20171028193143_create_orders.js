exports.up = function(knex, Promise) {
  return knex.schema.createTable('Order', table => {
    table.increments();
    table.integer('confirmationNum').notNullable();
    table
      .integer('userId')
      .notNullable()
      .references('User.id')
      .onDelete('cascade');
    table.float('total').notNullable();
    table.specificType('itemIds', 'jsonb[]');
    table
      .timestamp('dateCreated')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Order');
};

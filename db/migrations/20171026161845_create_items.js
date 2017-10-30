exports.up = function(knex, Promise) {
  return knex.schema.createTable('Item', table => {
    table.increments();
    table
      .string('name')
      .notNullable()
      .defaultTo('');
    table
      .string('description')
      .notNullable()
      .defaultTo('');
    table
      .string('category')
      .notNullable()
      .defaultTo('');
    table.boolean('isFeatured').notNullable();
    table.float('price').notNullable();
    table
      .string('imageUrl')
      .notNullable()
      .defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Item');
};

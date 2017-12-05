exports.up = function(knex, Promise) {
  return knex.schema.createTable('Favorite', table => {
    table.increments();
    table
      .integer('userId')
      .notNullable()
      .references('User.id')
      .onDelete('cascade');
    table
      .integer('itemId')
      .notNullable()
      .references('Item.id')
      .onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Favorite');
};

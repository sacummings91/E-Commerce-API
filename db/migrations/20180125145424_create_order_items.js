exports.up = function(knex, Promise) {
  return knex.schema.createTable('Order_Item', table => {
    table.increments();
    table
      .integer('orderId')
      .notNullable()
      .references('Order.id')
      .onDelete('cascade');
    table
      .integer('itemId')
      .notNullable()
      .references('Item.id')
      .onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Order_Item');
};

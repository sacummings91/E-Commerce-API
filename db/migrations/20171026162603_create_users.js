exports.up = function(knex, Promise) {
  return knex.schema.createTable('User', table => {
    table.increments();
    table
      .text('username')
      .notNullable()
      .unique();
    table
      .text('firstName')
      .notNullable()
      .defaultTo('');
    table
      .text('lastName')
      .notNullable()
      .defaultTo('');
    table
      .text('email')
      .notNullable()
      .defaultTo('');
    table
      .specificType('hashedPassword', 'char(60)')
      .notNullable()
      .defaultTo('');
    table
      .text('role')
      .notNullable()
      .defaultTo('ROLE_STANDARD_USER');
    table
      .timestamp('timeCreated')
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('timeModified');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('User');
};

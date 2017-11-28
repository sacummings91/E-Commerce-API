exports.seed = function(knex, Promise) {
  return Promise.resolve()
    .then(() => knex('Item').del())
    .then(() => knex('User').del())
    .then(() => knex('Order').del())
    .then(() => knex('Favorite').del())
    .then(() =>
      knex('Item').insert(
        [
          {
            id: 1,
            name: 'Black T-Shirt',
            description: 'This is a black T-Shirt',
            category: 'Shirt',
            isFeatured: true,
            price: 19.99,
            imageUrl: 'Some really long image URL'
          },
          {
            id: 2,
            name: 'White T-Shirt',
            description: 'This is a white T-Shirt',
            category: 'Shirt',
            isFeatured: false,
            price: 14.99,
            imageUrl: 'Some really long image URL'
          },
          {
            id: 3,
            name: 'Tye Dye Hoodie',
            description: 'This is a Tye Dye Hoodie',
            category: 'Jacket',
            isFeatured: true,
            price: 29.99,
            imageUrl: 'Some really long image URL'
          }
        ],
        '*'
      )
    )
    .then(() =>
      knex.raw(`SELECT setval('"Item_id_seq"', (SELECT MAX("id") FROM "Item"))`)
    )
    .then(() =>
      knex('User').insert([
        {
          id: 1,
          username: 'sacummings91',
          firstName: 'Steven',
          lastName: 'Cummings',
          email: 'sacummings91@gmail.com',
          hashedPassword:
            '$2a$10$7xLM1blUtLFdLieXTFl52OBjl5lLzP3CH0SYU.ZbLfJ2a3zzkav3e',
          role: 'ROLE_ADMIN'
        },
        {
          id: 2,
          username: 'branbones',
          firstName: 'Brandon',
          lastName: 'Bevans',
          email: 'brandonbevans@gmail.com',
          hashedPassword:
            '$2a$10$7xLM1blUtLFdLieXTFl52OBjl5lLzP3CH0SYU.ZbLfJ2a3zzkav3e',
          role: 'ROLE_STANDARD_USER'
        },
        {
          id: 3,
          username: 'trentacus',
          firstName: 'Trent',
          lastName: 'Duncan',
          email: 'tdunk2642@gmail.com',
          hashedPassword: '',
          role: 'ROLE_STANDARD_USER'
        }
      ])
    )
    .then(() =>
      knex.raw(`SELECT setval('"User_id_seq"', (SELECT MAX("id") FROM "User"))`)
    )
    .then(() =>
      knex('Order').insert([
        { id: 1, confirmationNum: 9385902, userId: 2 },
        { id: 2, confirmationNum: 0983845, userId: 2 },
        { id: 3, confirmationNum: 9385930, userId: 3 }
      ])
    )
    .then(() =>
      knex.raw(
        `SELECT setval('"Order_id_seq"', (SELECT MAX("id") FROM "Order"))`
      )
    )
    .then(() =>
      knex('Favorite').insert([
        { id: 1, userId: 2, itemId: 1 },
        { id: 2, userId: 2, itemId: 2 },
        { id: 3, userId: 3, itemId: 1 },
        { id: 4, userId: 1, itemId: 1 },
        { id: 5, userId: 1, itemId: 2 },
        { id: 6, userId: 1, itemId: 3 }
      ])
    )
    .then(() =>
      knex.raw(
        `SELECT setval('"Favorite_id_seq"', (SELECT MAX("id") FROM "Favorite"))`
      )
    );
};

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
            name: 'The California 2.0 T-Shirt in Black',
            description: 'Machine wash cold, Cotton',
            category: 'Shirts',
            isFeatured: true,
            price: 32.0,
            imageUrl:
              'https://cdn.karmaloopassets.com/vendor458x698/1041113-1.jpg'
          },
          {
            id: 2,
            name: 'The California 2.0 T-Shirt in White',
            description: 'Machine wash cold, cotton',
            category: 'Shirts',
            isFeatured: false,
            price: 32.0,
            imageUrl:
              'https://cdn.karmaloopassets.com/vendor458x698/1041114-1.jpg'
          },
          {
            id: 3,
            name: 'The Clima 3.0 Hoodie in Black',
            description: 'Machine wash cold, Cotton',
            category: 'Jackets',
            isFeatured: true,
            price: 55.0,
            imageUrl:
              'https://cdn.karmaloopassets.com/vendor458x698/1041117-1.jpg'
          },
          {
            id: 4,
            name:
              'The Daytripper Tape Striped Distressed Denim in Acid Wash Blue',
            description: 'Machine wash cold, 100% cotton',
            category: 'Bottoms',
            isFeatured: true,
            price: 60.0,
            imageUrl:
              'https://cdn.karmaloopassets.com/vendor458x698/667841-1.jpg'
          },
          {
            id: 5,
            name: 'The Trefoil Pullover Hoodie in Granite',
            description: 'Machine wash cold, 70% cotton 30% polyester',
            category: 'Jackets',
            isFeatured: false,
            price: 65.0,
            imageUrl:
              'https://cdn.karmaloopassets.com/vendor458x698/617175-1.jpg'
          },
          {
            id: 6,
            name: 'The Pacific Denim in Black',
            description: 'Machine wash cold, 98% cotton 2% elastine',
            category: 'Bottoms',
            isFeatured: false,
            price: 60.0,
            imageUrl:
              'https://cdn.karmaloopassets.com/vendor458x698/619375-1.jpg'
          },
          {
            id: 7,
            name: 'The Unisex Classic Old SKool in Black and White',
            description: 'Canvas upper, Rubber outsole',
            category: 'Footwear',
            isFeatured: false,
            price: 60.0,
            imageUrl:
              'https://cdn.karmaloopassets.com/vendor190x290/612753-1.jpg'
          },
          {
            id: 8,
            name: 'The Unisex Classic Authentic in Black',
            description: 'Canvas upper, Rubber outsole',
            category: 'Footwear',
            isFeatured: true,
            price: 50.0,
            imageUrl:
              'https://cdn.karmaloopassets.com/vendor190x290/612749-1.jpg'
          },
          {
            id: 9,
            name: 'The SS CF Seam Dual Hem Thermal Tee in Matte Black',
            description:
              'Crewneck, Short sleeves, Solid colorway, Side slits on hem, Elongated hem, Machine wash cold, 60% cotton, 40% polyester, Imported',
            category: 'Shirts',
            isFeatured: false,
            price: 20.95,
            imageUrl:
              'https://cdn.karmaloopassets.com/vendor190x290/599641-1.jpg'
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
        { id: 2, confirmationNum: 9983845, userId: 2 },
        { id: 3, confirmationNum: 9385930, userId: 3 },
        { id: 4, confirmationNum: 9283940, userId: 1 },
        { id: 5, confirmationNum: 9384859, userId: 1 }
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

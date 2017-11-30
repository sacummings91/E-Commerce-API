const ItemRepository = require('../repositories/ItemRepository');

const { DEBUG } = require('../../env');

module.exports = new ItemRepository({
  entityName: 'Item',
  db: require('./defaultDatabase'),
  logError: DEBUG ? console.error : undefined //eslint-disable-line no-console
});

const ItemService = require('../services/ItemService');

const { DEBUG } = require('../../env');

module.exports = new ItemService({
  // itemValidator: require('./itemValidator'),
  itemRepository: require('./itemRepository'),
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});

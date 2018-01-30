const OrderItemService = require('../services/OrderItemService');

const { DEBUG } = require('../../env');

module.exports = new OrderItemService({
  orderItemRepository: require('./orderItemRepository'),
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});

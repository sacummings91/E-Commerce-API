const OrderService = require('../services/OrderService');

const { DEBUG } = require('../../env');

module.exports = new OrderService({
  // orderValidator: require('./orderValidator'),
  orderRepository: require('./orderRepository'),
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});

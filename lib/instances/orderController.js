const OrderController = require('../controllers/OrderController');

module.exports = new OrderController({
  orderService: require('./orderService'),
  userService: require('./userService')
});

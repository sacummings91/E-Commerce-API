const { isFunction } = require('../utils/LangUtils');
const { noop } = require('../utils/FunctionUtils');

class OrderItemService {
  constructor({ orderItemRepository, logError }) {
    this._orderItemRepository = orderItemRepository;
    this._logError = isFunction(logError) ? logError : noop;
  }

  async findByOrderIds(orderIds) {
    try {
      const orderItems = orderIds.map(async id => {
        return await this._orderItemRepository.getById(id);
      }, this);
      return Promise.all(orderItems);
    } catch (error) {
      this._logError(error);
    }
  }
}

module.exports = OrderItemService;

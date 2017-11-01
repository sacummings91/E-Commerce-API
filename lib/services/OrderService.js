const { isFunction } = require('../utils/LangUtils');
const { noop } = require('../utils/FunctionUtils');

class OrderService {
  constructor({ orderValidator, orderRepository, userRepository, logError }) {
    // this._orderValidator = orderValidator;
    this._orderRepository = orderRepository;
    this._userRepository = userRepository;
    this._logError = isFunction(logError) ? logError : noop;
  }

  async getById(id) {
    try {
      const order = await this._orderRepository.getById(id);
      return order;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(OrderService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  async findByUserId(userId) {
    try {
      const orders = await this._orderRepository.findByAttribute(
        'userId',
        userId
      );
      return orders;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(OrderService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  async create(attributes) {
    try {
      return await this._orderRepository.create(attributes);
    } catch (error) {
      this._logError(error);
      throw this._createUnexpectedError();
    }
  }

  _createUnexpectedError() {
    return new Error(OrderService.ERROR_UNEXPECTED);
  }

  _createNotFoundError() {
    return new Error(OrderService.ERROR_NOT_FOUND);
  }
}

OrderService.ERROR_UNEXPECTED = 'OrderService.ERROR_UNEXPECTED';
OrderService.ERROR_NOT_FOUND = 'OrderService.ERROR_NOT_FOUND';

module.exports = OrderService;

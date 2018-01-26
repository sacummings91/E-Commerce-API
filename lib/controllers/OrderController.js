const EntityController = require('./EntityController');

class OrderController extends EntityController {
  constructor({ orderService, userService }) {
    super({
      entityName: 'Order',
      entityService: orderService
    });
    this._userService = userService;
    this._bindMethods(['findByUserId', 'createForUser']);
  }

  async findByUserId(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const user = await this._userService.getById(userId, {});
      const orders = await this._entityService.findByUserId(user.id);
      console.log('these are the orders >>>>>', orders);
      res.json(orders);
    } catch (error) {
      next(this._convertError(error));
    }
  }

  async createForUser(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const user = await this._userService.getById(userId, {});
      const attributes = Object.assign({}, req.body, { userId: user.id });
      const order = await this._entityService.create(attributes);
      res.status(201).json(order);
    } catch (error) {
      next(this._convertError(error));
    }
  }
}

module.exports = OrderController;

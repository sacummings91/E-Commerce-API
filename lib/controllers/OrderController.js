const EntityController = require('./EntityController');

class OrderController extends EntityController {
  constructor({ orderService, userService, orderItemService }) {
    super({
      entityName: 'Order',
      entityService: orderService
    });
    this._userService = userService;
    this._orderItemService = orderItemService;
    this._bindMethods(['findByUserId', 'createForUser']);
  }

  async findByUserId(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const user = await this._userService.getById(userId, {});
      const userOrders = await this._entityService.findByUserId(user.id);
      let orderItemIds = [];
      userOrders.forEach(order => {
        orderItemIds = orderItemIds.concat(order.itemIds);
      });
      const orderItems = await this._orderItemService.findByOrderIds(
        orderItemIds
      );
      let orderInfo = {};
      orderInfo.userOrders = userOrders;
      orderInfo.orderItems = orderItems;
      res.json(orderInfo);
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

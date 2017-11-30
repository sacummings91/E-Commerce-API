const EntityController = require('./EntityController');

class ItemController extends EntityController {
  constructor({ itemService, userService }) {
    super({
      entityName: 'Item',
      entityService: itemService
    });
    this._userService = userService;
    this._bindMethods(['getUserFavoriteItems']);
  }

  async getUserFavoriteItems(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const user = await this._userService.getById(userId, {});
      const items = await this._itemService.getByFavorites(user.id);
      res.json(items);
    } catch (error) {
      next(this._convertError(error));
    }
  }
}

module.exports = ItemController;

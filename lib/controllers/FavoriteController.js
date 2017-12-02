const EntityController = require('./EntityController');

class FavoriteController extends EntityController {
  constructor({ favoriteService, userService, itemService }) {
    super({
      entityName: 'Favorite',
      entityService: favoriteService
    });
    this._userService = userService;
    this._itemService = itemService;
    this._bindMethods(['findByUserId', 'createForUser']);
  }

  async findByUserId(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const user = await this._userService.getById(userId, {});
      const favorites = await this._entityService.findByUserId(user.id);
      res.json(favorites);
    } catch (error) {
      next(this._convertError(error));
    }
  }

  async createForUser(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const user = await this._userService.getById(userId, {});
      const attributes = Object.assign({}, req.body, { userId: user.id });
      const favorite = await this._entityService.create(attributes);
      const item = await this._itemService.getById(favorite.itemId);
      const favArray = [favorite, item];
      res.status(201).json(favArray);
    } catch (error) {
      next(this._convertError(error));
    }
  }
}

module.exports = FavoriteController;

const EntityController = require('./EntityController');

class FavoriteController extends EntityController {
  constructor({ favoriteService, userService }) {
    super({
      entityName: 'Favorite',
      entityService: favoriteService
    });
    this._userService = userService;
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
      res.status(201).json(favorite);
    } catch (error) {
      next(this._convertError(error));
    }
  }
}

module.exports = FavoriteController;

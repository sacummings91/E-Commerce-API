const { isFunction } = require('../utils/LangUtils');
const { noop } = require('../utils/FunctionUtils');

class FavoriteService {
  constructor({
    favoriteValidator,
    favoriteRepository,
    userRepository,
    logError
  }) {
    // this._favoriteValidator = favoriteValidator;
    this._favoriteRepository = favoriteRepository;
    this._userRepository = userRepository;
    this._logError = isFunction(logError) ? logError : noop;
  }

  async delete(id) {
    try {
      const favorite = await this._favoriteRepository.getById(id);
      if (!favorite) throw this._createNotFoundError();
      return await this._favoriteRepository.delete(id);
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(FavoriteService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  async findByUserId(userId) {
    try {
      const favorites = await this._favoriteRepository.findByAttribute(
        'userId',
        userId
      );
      return favorites;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(FavoriteService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  async create(attributes) {
    try {
      return await this._favoriteRepository.create(attributes);
    } catch (error) {
      this._logError(error);
      throw this._createUnexpectedError();
    }
  }

  _createUnexpectedError() {
    return new Error(FavoriteService.ERROR_UNEXPECTED);
  }

  _createNotFoundError() {
    return new Error(FavoriteService.ERROR_NOT_FOUND);
  }
}

FavoriteService.ERROR_UNEXPECTED = 'FavoriteService.ERROR_UNEXPECTED';
FavoriteService.ERROR_NOT_FOUND = 'FavoriteService.ERROR_NOT_FOUND';

module.exports = FavoriteService;

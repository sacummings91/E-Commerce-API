const bcrypt = require('bcryptjs');

const { omit, pick } = require('../utils/ObjectUtils');
const { isFunction } = require('../utils/LangUtils');
const { noop } = require('../utils/FunctionUtils');

class UserService {
  constructor({
    userValidator,
    userRepository,
    logError,
    favoriteRepository,
    itemRepository
  }) {
    this._userValidator = userValidator;
    this._userRepository = userRepository;
    this._logError = isFunction(logError) ? logError : noop;
    this._favoriteRepository = favoriteRepository;
    this._itemRepository = itemRepository;
  }

  async create(attributes) {
    try {
      attributes = Object.assign({}, attributes);
      attributes = await this._userValidator.validate(attributes, 'forCreate');
      const hashedPassword = await bcrypt.hash(attributes.password, 10);
      delete attributes.password;
      attributes.hashedPassword = hashedPassword;
      const user = await this._userRepository.create(attributes);
      return omit(user, 'hashedPassword');
    } catch (error) {
      this._logError(error);
      if (error.message.endsWith('Validator.ERROR_INVALID_INPUT')) {
        throw this._createInvalidInputError();
      }
      throw this._createUnexpectedError();
    }
  }

  async getById(id, authentication) {
    try {
      const authenticatedUser = await this._getAuthenticatedUser(
        authentication
      );
      const user = await this._userRepository.getById(id);
      if (!user) throw this._createNotFoundError();

      const favorites = await this._favoriteRepository.findByAttribute(
        'userId',
        id
      );
      user.favorites = favorites;

      const favItemIds = favorites.map(favorite => {
        return favorite.itemId;
      });

      const favoriteItems = await this._itemRepository.getUserFavoriteItems(
        favItemIds
      );

      user.favoriteItems = favoriteItems;

      if (
        authenticatedUser &&
        (authenticatedUser.role === 'ROLE_ADMIN' || authenticatedUser.id === id)
      ) {
        return omit(user, 'hashedPassword');
      }
      return pick(user, ['id', 'username']);
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(UserService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  async update(id, attributes, authentication) {
    try {
      const authenticatedUser = await this._getAuthenticatedUser(
        authentication
      );
      if (!authenticatedUser) throw this._createPermissionDeniedError();
      if (
        authenticatedUser.id !== id &&
        authenticatedUser.role !== 'ROLE_ADMIN'
      ) {
        throw this._createPermissionDeniedError();
      }
      attributes = await this._userValidator.validate(attributes, 'forUpdate');
      const user = await this._userRepository.update(id, attributes);
      if (!user) throw this._createNotFoundError();
      return user;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(UserService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  async _getAuthenticatedUser(authentication) {
    const { userId: authenticatedUserId } = authentication;
    if (!Number.isFinite(authenticatedUserId)) return null;
    const authenticatedUser = await this._userRepository.getById(
      authenticatedUserId
    );
    return omit(authenticatedUser, 'hashedPassword');
  }

  _createUnexpectedError() {
    return new Error(UserService.ERROR_UNEXPECTED);
  }

  _createNotFoundError() {
    return new Error(UserService.ERROR_NOT_FOUND);
  }

  _createInvalidInputError() {
    return new Error(UserService.ERROR_INVALID_INPUT);
  }

  _createPermissionDeniedError() {
    return new Error(UserService.ERROR_PERMISSION_DENIED);
  }
}

UserService.ERROR_UNEXPECTED = 'UserService.ERROR_UNEXPECTED';
UserService.ERROR_NOT_FOUND = 'UserService.ERROR_NOT_FOUND';
UserService.ERROR_INVALID_INPUT = 'UserService.ERROR_INVALID_INPUT';
UserService.ERROR_PERMISSION_DENIED = 'UserService.ERROR_PERMISSION_DENIED';

module.exports = UserService;

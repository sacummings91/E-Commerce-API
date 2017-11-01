const bcrypt = require('bcryptjs');

const { isFunction } = require('../utils/LangUtils');
const { noop } = require('../utils/FunctionUtils');

class UserService {
  constructor({ userValidator, userRepository, logError }) {
    // this._userValidator = userValidator;
    this._userRepository = userRepository;
    this._logError = isFunction(logError) ? logError : noop;
  }

  async create(attributes) {
    try {
      attributes = Object.assign({}, attributes);
      const hashedPassword = await bcrypt.hash(attributes.password, 10);
      delete attributes.password;
      attributes.hashedPassword = hashedPassword;
      const user = await this._userRepository.create(attributes);
      return user;
    } catch (error) {
      this._logError(error);
      throw this._createUnexpectedError();
    }
  }

  async getById(id) {
    try {
      const user = await this._userRepository.getById(id);
      if (!user) throw this._createNotFoundError();
      return user;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(UserService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  async update(id, attributes) {
    try {
      const user = await this._userRepository.update(id, attributes);
      if (!user) throw this._createNotFoundError();
      return user;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(UserService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  _createUnexpectedError() {
    return new Error(UserService.ERROR_UNEXPECTED);
  }

  _createNotFoundError() {
    return new Error(UserService.ERROR_NOT_FOUND);
  }
}

UserService.ERROR_UNEXPECTED = 'UserService.ERROR_UNEXPECTED';
UserService.ERROR_NOT_FOUND = 'UserService.ERROR_NOT_FOUND';

module.exports = UserService;

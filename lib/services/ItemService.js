const { noop } = require('../utils/FunctionUtils');
const { isFunction } = require('../utils/LangUtils');

class ItemService {
  constructor({ itemValidator, itemRepository, logError }) {
    this._itemValidator = itemValidator;
    this._itemRepository = itemRepository;
    this._logError = isFunction(logError) ? logError : noop;
  }

  async getAll() {
    try {
      const items = await this._itemRepository.getAll();
      return items;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(ItemService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  async create(attributes) {
    try {
      attributes = Object.assign({}, attributes);
      const item = await this._itemRepository.create(attributes);
      return item;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(ItemService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  async getById(id) {
    try {
      const user = await this._itemRepository.getById(id);
      if (!user) throw this._createNotFoundError();
      return user;
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(ItemService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  async update(id, attributes) {
    try {
      const user = await this._itemRepository.update(id, attributes);
      if (!user) throw this._createNotFoundError();
      return user;
    } catch (error) {
      this._logError(error);
      throw this._createUnexpectedError();
    }
  }

  async delete(id) {
    try {
      const user = await this._itemRepository.delete(id);
      if (!user) throw this._createNotFoundError();
      return user;
    } catch (error) {
      this._logError(error);
      throw this._createUnexpectedError();
    }
  }

  _createUnexpectedError() {
    return new Error(ItemService.ERROR_UNEXPECTED);
  }

  // _createPermissionDeniedError() {
  //   return new Error(ItemService.ERROR_PERMISSION_DENIED);
  // }
  //
  // _createInvalidInputError() {
  //   return new Error(ItemService.ERROR_INVALID_INPUT);
  // }

  _createNotFoundError() {
    return new Error(ItemService.ERROR_NOT_FOUND);
  }
}

ItemService.ERROR_UNEXPECTED = 'ItemService.ERROR_UNEXPECTED';
ItemService.ERROR_NOT_FOUND = 'ItemService.ERROR_NOT_FOUND';
// ItemService.ERROR_PERMISSION_DENIED = 'ItemService.ERROR_PERMISSION_DENIED';
// ItemService.ERROR_INVALID_INPUT = 'ItemService.ERROR_INVALID_INPUT';

module.exports = ItemService;

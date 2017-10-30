const { isFunction } = require('../utils/LangUtils');
const { noop } = require('../utils/FunctionUtils');

class EntityRepository {
  constructor({ entityName, db, logError }) {
    this._entityName = entityName;
    this._db = db;
    this._logError = isFunction(logError) ? logError : noop;
  }

  async getAll() {
    try {
      const records = await this._db(this._entityName);
      return records;
    } catch (error) {
      this._logError(error);
      throw this._createUnexpectedError();
    }
  }

  async create(attributes) {
    try {
      const [record] = await this._db(this._entityName)
        .insert(attributes)
        .returning('*');
      return record;
    } catch (error) {
      this._logError(error);
      throw this._createUnexpectedError;
    }
  }

  _createUnexpectedError() {
    throw new Error(
      EntityRepository.ERROR_UNEXPECTED.replace('Entity', this._entityName)
    );
  }
}

EntityRepository.ERROR_UNEXPECTED = 'EntityRepository.ERROR_UNEXPECTED';

module.exports = EntityRepository;

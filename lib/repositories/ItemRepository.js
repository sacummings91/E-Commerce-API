const EntityRepository = require('./EntityRepository');
const { isFunction } = require('../utils/LangUtils');
const { noop } = require('../utils/FunctionUtils');

class ItemRepository extends EntityRepository {
  constructor({ entityName, db, logError }) {
    super({
      entityName: 'Item'
    });
    this._entityName = entityName;
    this._db = db;
    this._logError = isFunction(logError) ? logError : noop;
  }

  async getUserFavoriteItems(favIds) {
    try {
      const favObjs = await favIds.map(async id => {
        const record = await this._db(this._entityName).where({ id });
        return record[0];
      });
      return Promise.all(favObjs);
    } catch (error) {
      throw this._createUnexpectedError();
    }
  }
}

module.exports = ItemRepository;

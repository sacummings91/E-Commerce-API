const Boom = require('boom');

class EntityController {
  constructor({ entityName, entityService }) {
    this._entityName = entityName;
    this._entityService = entityService;
    this._bindMethods(['getAll', 'create', 'getById', 'update', 'delete']);
  }

  async getAll(req, res, next) {
    try {
      const entities = await this._entityService.getAll();
      res.json(entities);
    } catch (error) {
      next(this._convertError(error));
    }
  }

  async create(req, res, next) {
    try {
      const entity = await this._entityService.create(req.body);
      res.status(201).json(entity);
    } catch (error) {
      next(this._convertError(error));
    }
  }

  async getById(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const entity = await this._entityService.getById(id);
      res.json(entity);
    } catch (error) {
      next(this._convertError(error));
    }
  }

  async update(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const entity = await this._entityService.update(id, req.body);
      res.json(entity);
    } catch (error) {
      next(this._convertError(error));
    }
  }

  async delete(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const entity = await this._entityService.delete(id);
      res.json(entity);
    } catch (error) {
      next(this._convertError(error));
    }
  }

  _bindMethods(methodNames) {
    methodNames.forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });
  }

  _convertError(error) {
    if (error.message.endsWith('Service.ERROR_INVALID_INPUT')) {
      return Boom.badRequest(error.message);
    }
    if (error.message.endsWith('Service.ERROR_PERMISSION_DENIED')) {
      return Boom.forbidden(error.message);
    }
    if (error.message.endsWith('Service.ERROR_NOT_FOUND')) {
      return Boom.notFound(error.message);
    }
    if (error.message.endsWith('Service.ERROR_UNEXPECTED')) {
      return Boom.badImplementation(error.message);
    }
    return Boom.badImplementation();
  }
}

module.exports = EntityController;

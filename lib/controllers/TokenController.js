const Boom = require('boom');

class TokenController {
  constructor({ tokenService }) {
    this._tokenService = tokenService;
    this.authenticate = this.authenticate.bind(this);
  }

  async authenticate(req, res, next) {
    try {
      const token = await this._tokenService.authenticate(req.body);
      res.json({ token });
    } catch (error) {
      next(this._convertError(error));
    }
  }

  _convertError(error) {
    if (error.message.endsWith('Service.ERROR_INVALID_INPUT')) {
      return Boom.badRequest(error.message);
    }
    if (error.message.endsWith('Service.ERROR_CREDENTIALS_INVALID')) {
      return Boom.unauthorized(error.message);
    }
    if (error.message.endsWith('Service.ERROR_UNEXPECTED')) {
      return Boom.badImplementation(error.message);
    }
    return Boom.badImplementation();
  }
}

module.exports = TokenController;

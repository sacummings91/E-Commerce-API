const { promisify } = require('util');
const JwtUtils = require('jsonwebtoken');
const signJwt = promisify(JwtUtils.sign);
const bcrypt = require('bcryptjs');

const { isFunction } = require('../utils/LangUtils');
const { noop } = require('../utils/FunctionUtils');

class TokenService {
  constructor({ tokenValidator, jwtSecretKey, userRepository, logError }) {
    this._tokenValidator = tokenValidator;
    this._userRepository = userRepository;
    this._jwtSecretKey = jwtSecretKey;
    this._logError = isFunction(logError) ? logError : noop;
  }

  async authenticate(credentials) {
    try {
      credentials = Object.assign({}, credentials);
      if (!credentials.username || !credentials.password) {
        throw this.createInvalidInputError();
      }
      credentials = await this._tokenValidator.validate(credentials);
      const [user] = await this._userRepository.findByAttribute(
        'username',
        credentials.username
      );
      if (!user) throw this._createInvalidCredentialsError();
      const isValidPassword = await bcrypt.compare(
        credentials.password,
        user.hashedPassword
      );
      if (!isValidPassword) throw this._createInvalidCredentialsError();
      const timeIssued = Math.floor(Date.now() / 1000);
      const timeExpires = timeIssued + 86400 * 14;
      return signJwt(
        {
          iss: 'ecommerce',
          aud: 'ecommerce',
          iat: timeIssued,
          exp: timeExpires,
          sub: user.id
        },
        this._jwtSecretKey
      );
    } catch (error) {
      this._logError(error);
      if (error.message.startsWith(TokenService.name)) throw error;
      throw this._createUnexpectedError();
    }
  }

  _createUnexpectedError() {
    return new Error(TokenService.ERROR_UNEXPECTED);
  }

  _createInvalidInputError() {
    return new Error(TokenService.ERROR_INVALID_INPUT);
  }

  _createInvalidCredentialsError() {
    return new Error(TokenService.ERROR_CREDENTIALS_INVALID);
  }
}

TokenService.ERROR_UNEXPECTED = 'TokenService.ERROR_UNEXPECTED';
TokenService.ERROR_INVALID_INPUT = 'TokenService.ERROR_INVALID_INPUT';
TokenService.ERROR_CREDENTIALS_INVALID =
  'TokenService.ERROR_CREDENTIALS_INVALID';

module.exports = TokenService;

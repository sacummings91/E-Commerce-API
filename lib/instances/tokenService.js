const TokenService = require('../services/TokenService');

const { DEBUG, JWT_KEY } = require('../../env');

module.exports = new TokenService({
  tokenValidator: require('./tokenValidator'),
  jwtSecretKey: JWT_KEY,
  userRepository: require('./userRepository'),
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});

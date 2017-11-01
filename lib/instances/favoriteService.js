const FavoriteService = require('../services/FavoriteService');

const { DEBUG } = require('../../env');

module.exports = new FavoriteService({
  // favoriteValidator: require('./favoriteValidator'),
  favoriteRepository: require('./favoriteRepository'),
  userRepository: require('./userRepository'),
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});

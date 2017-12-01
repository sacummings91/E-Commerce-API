const FavoriteController = require('../controllers/FavoriteController');

module.exports = new FavoriteController({
  favoriteService: require('./favoriteService'),
  userService: require('./userService'),
  itemService: require('./itemService')
});

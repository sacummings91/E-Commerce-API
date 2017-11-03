const TokenController = require('../controllers/tokenController');

module.exports = new TokenController({
  tokenService: require('./tokenService')
});

const TokenController = require('../controllers/TokenController');

module.exports = new TokenController({
  tokenService: require('./tokenService')
});

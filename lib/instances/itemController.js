const EntityController = require('../controllers/EntityController');

module.exports = new EntityController({
  entityName: 'Item',
  entityService: require('./itemService')
});

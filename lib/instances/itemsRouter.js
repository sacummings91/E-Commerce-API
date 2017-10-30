const express = require('express');
const Boom = require('boom');
const router = express.Router();

const itemController = require('./itemController');

router.post('/items', itemController.create);
router.get('/items', itemController.getAll);
router.all('/items', (req, res, next) => {
  next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'GET', 'POST']));
});

router.get('/items/:id(\\d+)', itemController.getById);

module.exports = router;

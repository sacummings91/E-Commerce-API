const express = require('express');
const Boom = require('boom');

const router = express.Router();

const orderController = require('./orderController');

router.get('/orders/:id(\\d+)', orderController.getById);
router.all('/orders/:id(\\d+)', (request, response, next) =>
  next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'GET']))
);

router.get('/users/:userId(\\d+)/orders', orderController.findByUserId);
router.post('/users/:userId(\\d+)/orders', orderController.createForUser);
router.all('/users/:userId(\\d+)/orders', (request, response, next) =>
  next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'GET', 'POST']))
);

module.exports = router;

const express = require('express');
const Boom = require('boom');
const router = express.Router();

const userController = require('./userController');

router.post('/users', userController.create);
router.all('/users', (request, response, next) =>
  next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'POST']))
);

router.get('/users/:id(\\d+)', userController.getById);
router.patch('/users/:id(\\d+)', userController.update);
router.all('/users', (request, response, next) =>
  next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'GET', 'PATCH']))
);

module.exports = router;

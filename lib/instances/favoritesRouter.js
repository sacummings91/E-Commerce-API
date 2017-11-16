const express = require('express');
const Boom = require('boom');

const router = express.Router();

const favoriteController = require('./favoriteController');

router.delete('/favorites/:id(\\d+)', favoriteController.delete);
router.all('/favorites/:id(\\d+)', (request, response, next) =>
  next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'DELETE']))
);

router.get('/users/:userId(\\d+)/favorites', favoriteController.findByUserId);
router.post('/users/:userId(\\d+)/favorites', favoriteController.createForUser);
router.all('/users/:userId(\\d+)/favorites', (request, response, next) =>
  next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'GET', 'POST']))
);

module.exports = router;

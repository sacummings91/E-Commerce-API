const express = require('express');
const Boom = require('boom');
const router = express.Router();

const tokenController = require('./tokenController');

router.post('/token', tokenController.authenticate);
router.all('/token', (request, response, next) => {
  next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'POST']));
});

module.exports = router;

const express = require('express');
const Boom = require('Boom');
const router = express.router();

const userController = require('./userController');

router.post('/users');

router.get('/users/:id(\\d+)');
router.patch('/users/:id(\\d+)');

router.get('/users/:id(\\d+)/favorites');
router.post('/users/:id(\\d+)/favorites');

router.get('/users/:id(\\d+)/orders');
router.post('/users/:id(\\d+)/orders');

module.exports = router;

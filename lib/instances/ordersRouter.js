const express = require('express');
const Boom = require('Boom');
const router = express.router();

const orderController = require('./orderController');

router.get('/orders/:id(\\d+)');

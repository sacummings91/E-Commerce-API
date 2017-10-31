const express = require('express');
const Boom = require('Boom');
const router = express.router();

const favoriteController = require('./favoriteController');

router.delete('/favorites/:id(\\d+)');

const Yup = require('yup');

const Validator = require('../validators/Validator');

const { DEBUG } = require('../../env');

const schemas = {
  default: {
    username: Yup.string()
      .trim()
      .lowercase()
      .required()
      .min(4),
    password: Yup.string()
      .required()
      .min(6)
  }
};

module.exports = new Validator({
  name: 'Token',
  schemas,
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});

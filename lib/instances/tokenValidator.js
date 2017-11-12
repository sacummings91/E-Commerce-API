const Yup = require('yup');

const Validator = require('../validators/Validator');

const { DEBUG } = require('../../env');

const schemas = {
  default: {
    username: Yup.string()
      .trim()
      .lowercase()
      .required(),
    password: Yup.string().required()
  }
};

module.exports = new Validator({
  name: 'Token',
  schemas,
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});

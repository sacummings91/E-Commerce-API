const Yup = require('yup');

const Validator = require('../validators/Validator');

const { DEBUG } = require('../../env');

const schemas = {
  forCreate: {
    firstName: Yup.string()
      .trim()
      .required()
      .min(2),
    lastName: Yup.string()
      .trim()
      .required()
      .min(2),
    email: Yup.string()
      .email()
      .trim()
      .required(),
    username: Yup.string()
      .trim()
      .lowercase()
      .required()
      .min(4),
    password: Yup.string().min(6),
    role: Yup.string()
  },
  forUpdate: {
    firstName: Yup.string()
      .trim()
      .min(2),
    lastName: Yup.string()
      .trim()
      .min(2),
    email: Yup.string()
      .email()
      .trim()
  }
};

module.exports = new Validator({
  name: 'User',
  schemas,
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});

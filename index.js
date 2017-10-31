const express = require('express');
const bodyParser = require('body-parser');
const Boom = require('boom');
const UnauthorizedError = require('express-jwt/lib/errors/UnauthorizedError');

const server = express();

const itemsRouter = require('./lib/instances/itemsRouter');

server.use(bodyParser.json());
server.use(itemsRouter);

server.all('*', (req, res, next) => res.sendStatus(404));

server.use((err, req, res, next) => {
  console.log(err); // eslint-disable-line no-console
  if (err instanceof UnauthorizedError || err.typeof === Boom.unauthorized) {
    error = Boom.unauthorized(error.message, ['Bearer']);
  }
  if (!err.isBoom) error = Boom.badImplementation();
  res
    .set(err.output.headers)
    .status(err.output.statusCode)
    .json(err.output.payload);
});

const port =
  process.env.PORT && /^\d+$/.test(process.env.PORT)
    ? parseInt(process.env.PORT)
    : 8000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line no-console
});

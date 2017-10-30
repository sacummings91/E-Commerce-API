const express = require('express');
const bodyParser = require('body-parser');

const server = express();

const itemsRouter = require('./lib/instances/itemsRouter');

server.use(bodyParser.json());
server.use(itemsRouter);

const port =
  process.env.PORT && /^\d+$/.test(process.env.PORT)
    ? parseInt(process.env.PORT)
    : 8000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line no-console
});

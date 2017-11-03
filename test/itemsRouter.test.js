'use strict';

process.env.NODE_ENV = 'test';
const request = require('supertest');
const { suite, test } = require('mocha');
const index = require('../index');
const { addDatabaseHooks } = require('./databaseHooks');

suite(
  '/items endpoints',
  addDatabaseHooks(() => {
    suite('with token', () => {
      const agent = request.agent(index);
      let token = null;

      beforeEach(done => {
        request(index)
          .post('/token')
          .set('Accept', 'application/json')
          .set('Content-type', 'application/json')
          .send({ username: 'sacummings91', password: 'therealst33zy!!!' })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            token = res.body.token;
            done();
          });
      });
    });

    suite('without token', () => {
      test('GET /items', done => {
        request(index)
          .get('/items')
          .set('Accept', 'application/json')
          .expect('Content-Type', /plain/)
          .expect(200);
      });
    });
  })
);

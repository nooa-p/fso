/* eslint-disable no-undef */
const mongoose = require('mongoose');

// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require('supertest');

const app = require('../app');

const api = supertest(app);

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('correct number of blogs is returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(3);
});

afterAll(async () => {
  await mongoose.connection.close();
});

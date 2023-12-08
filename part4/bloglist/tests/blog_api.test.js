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

test('unique identifier of blog posts is id', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.close();
});

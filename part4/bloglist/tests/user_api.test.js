/* eslint-disable no-undef */
const mongoose = require('mongoose');

const supertest = require('supertest');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');
const helper = require('./test_helper');

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'nooap',
      name: 'Nooa Peltokangas',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation returns with an error when new user is invalid', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mm',
      name: 'Matti Mallikas',
      password: 'matinsalainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

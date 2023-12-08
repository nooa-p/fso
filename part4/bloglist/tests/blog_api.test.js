/* eslint-disable no-undef */
const mongoose = require('mongoose');

// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require('supertest');

const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Example Blog Post',
    author: 'John Doe',
    url: 'https://exampleblog.co.uk/post/5',
    likes: 4,
  },
  {
    title: 'Awesome Things Post',
    author: 'Jane Doe',
    url: 'https://awesomethings.org/id/11',
    likes: 7,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('correct number of blogs is returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(2);
});

test('unique identifier of blog posts is id', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

test('a new blog post is created', async () => {
  const newBlog = {
    title: 'Test Blog Post',
    author: 'John Doe',
    url: 'https://testblog.org/id/2',
    likes: 7,
  };
  await api.post('/api/blogs', newBlog);
  const newResponse = await api.get('/api/blogs');
  expect(newResponse.body.length).toBe(3);
});

test('if no likes on new post, set likes at zero', async () => {
  const newBlog = {
    title: 'Another Test Post',
    author: 'John Doe',
    url: 'https://testblog.org/id/5',
  };
  const response = await api.post('/api/blogs', newBlog);
  expect(response.body.likes).toBe(0);
});

test('respond 400 bad request when title or url empty', async () => {
  // TODO
});

afterAll(async () => {
  await mongoose.connection.close();
});

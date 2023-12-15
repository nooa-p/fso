/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs);
  // });
});

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const { user } = request;

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id,
  });
  try {
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
  } catch (exception) {
    next(exception);
  }
  // blog.save().then((result) => {
  //   response.status(201).json(result);
  // });
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const { user } = request;
  const blog = await Blog.findById(request.params.id);
  if (!(blog.user.toString() === user._id.toString())) {
    return response.status(401).json({ error: 'token invalid' });
  }
  try {
    await Blog.findByIdAndDelete(request.params.id);
    await User.findByIdAndUpdate(
      user._id.toString(),
      { $pull: { blogs: request.params.id } },
      { new: true },
    );
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = {
    likes: request.body.likes,
  };
  try {
    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      blog,
      { new: true },
    );
    response.json(result);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;

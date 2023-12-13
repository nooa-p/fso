const usersRouter = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  response.json(users);
});

usersRouter.post('/', async (request, response, next) => {
  if (request.body.password.length > 2) {
    const { username, name, password } = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });
    try {
      const savedUser = await user.save();
      response.status(201).json(savedUser);
    } catch (exception) {
      next(exception);
    }
  } else {
    response.status(400).json({ error: `User validation failed: password: Path 'password' ('${request.body.password}') is shorter than the minimum allowed length (3).` });
  }
});

module.exports = usersRouter;

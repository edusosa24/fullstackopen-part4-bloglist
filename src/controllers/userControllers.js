const dao = require('../dao/dao');
const User = require('../models/user');
const { encryptPassword } = require('../utils/bcrypt');
const logger = require('../utils/loggers');

/* eslint-disable no-unused-vars */

const postNewUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Missing username/password.',
      });
    }

    if (password.length < 4) {
      return res.status(400).json({
        error: 'Password must be at least 4 characters long.',
      });
    }

    const hashPassword = await encryptPassword(password);
    const newUser = new User({
      username: username,
      password: hashPassword,
    });

    const response = await dao.createUser(newUser);
    return res.status(201).json(response).end();
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json(e).end();
  }
};

module.exports = {
  postNewUser,
};

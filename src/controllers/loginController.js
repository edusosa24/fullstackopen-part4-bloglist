const dao = require('../dao/dao');
const jwt = require('jsonwebtoken');
const { checkPassword } = require('../utils/bcrypt');
const logger = require('../utils/loggers');

/* eslint-disable no-unused-vars */

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await dao.getUser(username);

    const passwordCorrect =
      user === null ? false : await checkPassword(password, user.password);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'Invalid username or password',
      });
    }

    console.log('Bien');
    const userForToken = {
      username: user.username,
      id: user._id,
    };

    console.log(userForToken);

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    console.log(token);

    return res.status(200).send({ token, username: user.username }).end();
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json(e).end();
  }
};

module.exports = {
  login,
};

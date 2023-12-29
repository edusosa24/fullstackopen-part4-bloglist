const jwt = require('jsonwebtoken');
const dao = require('../dao/dao');

const tokenIsValid = async (authorization) => {
  if (!(authorization && authorization.startsWith('Bearer '))) {
    return null;
  }
  const auth = authorization.replace('Bearer ', '');
  const decodedToken = jwt.verify(auth, process.env.SECRET);
  if (!decodedToken.id) {
    return null;
  }

  const user = await dao.getUser(decodedToken.username);

  return user;
};

module.exports = {
  tokenIsValid,
};

const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return hashPassword;
};

const checkPassword = async (password, hashPassword) => {
  const isValid = await bcrypt.compare(password, hashPassword);
  return isValid;
};

module.exports = {
  encryptPassword,
  checkPassword,
};

const Blog = require('../models/blog');
const User = require('../models/user');
// const User = require('../models/user');

// BLOG

const findAll = async () => {
  const data = await Blog.find({}).populate('user');
  return data;
};

const createBlog = async (blog) => {
  const data = await blog.save();
  return data;
};

const updateBlog = async (id, blog) => {
  const data = await Blog.findByIdAndUpdate(id, blog, { new: true });
  return data;
};

const deleteBlog = async (id) => {
  const response = await Blog.findByIdAndDelete(id);
  return response;
};

// USER

const createUser = async (user) => {
  const data = await user.save();
  return data;
};

const getFirstUser = async () => {
  const data = await User.findOne({});
  return data;
};

const getUser = async (username) => {
  const data = await User.findOne({ username: username });
  return data;
};

module.exports = {
  findAll,
  createBlog,
  updateBlog,
  deleteBlog,
  createUser,
  getFirstUser,
  getUser,
};

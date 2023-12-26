const Blog = require('../models/blog');

const findAll = async () => {
  const data = await Blog.find({});
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

module.exports = {
  findAll,
  createBlog,
  updateBlog,
  deleteBlog,
};

const Blog = require('../models/blog');

const findAll = () => {
  return Blog.find({}).then((response) => {
    return response;
  });
};

const createBlog = (blog) => {
  return blog.save().then(() => {
    return blog;
  });
};

module.exports = {
  findAll,
  createBlog,
};

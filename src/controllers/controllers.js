const dao = require('../dao/dao');
const Blog = require('../models/blog');
const logger = require('../utils/loggers');

/* eslint-disable no-unused-vars */

const getAllBlogs = (req, res, next) => {
  try {
    dao.findAll().then((response) => {
      return res.json(response);
    });
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json(e);
  }
};

const postNewBlog = (req, res, next) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.url ||
      !req.body.likes
    ) {
      return res.status(400).json({
        message: 'Blog requires title, author, url and likes',
      });
    }

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
    });

    dao.createBlog(blog).then((response) => {
      return res.json(response);
    });
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json(e);
  }
};

module.exports = {
  getAllBlogs,
  postNewBlog,
};

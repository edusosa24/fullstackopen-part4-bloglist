const dao = require('../dao/dao');
const Blog = require('../models/blog');
const { tokenIsValid } = require('../utils/login');
const logger = require('../utils/loggers');

/* eslint-disable no-unused-vars */

const getAllBlogs = async (req, res, next) => {
  try {
    const response = await dao.findAll();
    return res.status(200).json(response).end();
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json(e).end();
  }
};

const postNewBlog = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { title, author, url, likes } = req.body;
    if (!title || !author || !url || !likes) {
      return res.status(400).json({
        error: 'Blog requires title, author, url and likes',
      });
    }

    const user = await tokenIsValid(authorization);

    if (!user) {
      return res.status(401).json({
        error: 'Authorization is missing or is invalid',
      });
    }

    const blog = new Blog({
      title: title,
      author: author,
      url: url,
      likes: likes,
      user: user.id,
    });

    const response = await dao.createBlog(blog);
    return res.status(201).json(response).end();
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json(e).end();
  }
};

const putBlog = async (req, res, next) => {
  try {
    const { title, author, url, likes } = req.body;
    if (!title || !author || !url || !likes) {
      return res
        .status(400)
        .json({
          error: 'Blog requires title, author, url and likes',
        })
        .end();
    }

    const response = await dao.updateBlog(req.params.id, req.body);
    return res.status(200).json(response).end();
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json(e).end();
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const response = await dao.deleteBlog(req.params.id);
    return res.status(204).end();
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json(e).end();
  }
};

module.exports = {
  getAllBlogs,
  postNewBlog,
  putBlog,
  deleteBlog,
};

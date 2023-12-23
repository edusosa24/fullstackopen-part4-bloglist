const lodash = require('lodash');

/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0);
};

const favoritePost = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  if (blogs.length === 1) {
    return blogs[0];
  }

  const likes = blogs.map((blog) => blog.likes);
  const mostLikes = Math.max(...likes);
  const favoritePosition = likes.indexOf(mostLikes);
  return blogs[favoritePosition];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: 1,
    };
  }

  const authorBlogs = lodash.groupBy(blogs, 'author');

  const blogsCounter = () => {
    const auxArr = [];
    for (const [key, value] of Object.entries(authorBlogs)) {
      auxArr.push({ author: key, blogs: value.length });
    }
    return auxArr;
  };

  return lodash.maxBy(blogsCounter(), 'blogs');
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes,
    };
  }

  const authorBlogs = lodash.groupBy(blogs, 'author');

  const likesCounter = () => {
    const auxArr = [];
    for (const [key, value] of Object.entries(authorBlogs)) {
      const authorLikes = lodash.sum(value.map((blog) => blog.likes));
      console.log(authorLikes);

      auxArr.push({ author: key, likes: authorLikes });
    }
    return auxArr;
  };

  return lodash.maxBy(likesCounter(), 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoritePost,
  mostBlogs,
  mostLikes,
};

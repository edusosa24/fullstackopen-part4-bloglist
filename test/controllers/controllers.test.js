const mongoose = require('mongoose');
const supertest = require('supertest');
const { blogs, newBlog } = require('./blogsData');
const Blog = require('../../src/models/blog');
const app = require('../../src/server/app');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let testBlog = new Blog(blogs[0]);
  await testBlog.save();
  testBlog = new Blog(blogs[1]);
  await testBlog.save();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET endpoints tests', () => {
  test('two blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(2);
  });

  test('blogs have id property', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
    expect(response.body[1].id).toBeDefined();
  });
});

describe('POST endpoints tests', () => {
  test('new blog is created and the total is 3', async () => {
    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.body.title).toBe(newBlog.title);
    const getResponse = await api.get('/api/blogs');
    expect(getResponse.body).toHaveLength(3);
  });
});

describe('PUT endpoints tests', () => {
  test('blog is updated and response has the same data', async () => {
    const allBlogs = await api.get('/api/blogs');
    const response = await api
      .put(`/api/blogs/${allBlogs.body[0].id}`)
      .send(newBlog);
    console.log(response.body);
    expect(response.body.title).toBe(newBlog.title);
    expect(response.body.author).toBe(newBlog.author);
    expect(response.body.url).toBe(newBlog.url);
    expect(response.body.likes).toBe(newBlog.likes);
  });
});

describe('DELETE endpoints tests', () => {
  /* eslint-disable no-unused-vars */

  test('blog is deleted and the total is 1', async () => {
    const allBlogs = await api.get('/api/blogs');
    const response = await api.delete(`/api/blogs/${allBlogs.body[0].id}`);
    expect(response.status).toBe(204);
    const updatedBlogList = await api.get('/api/blogs');
    expect(updatedBlogList.body).toHaveLength(1);
  });

  test('blog id is wrong and the total is 2', async () => {
    const response = await api.delete(`/api/blogs/1254125421`);
    const updatedBlogList = await api.get('/api/blogs');
    expect(updatedBlogList.body).toHaveLength(2);
  });
});

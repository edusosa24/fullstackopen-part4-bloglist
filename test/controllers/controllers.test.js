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
    expect(response.body.author).toBe(newBlog.author);
    const getResponse = await api.get('/api/blogs');
    expect(getResponse.body).toHaveLength(3);
  });
});

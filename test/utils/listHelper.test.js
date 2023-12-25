const listHelper = require('../../src/utils/listHelper');
const blogsData = require('./listHelperData');

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('Total likes test', () => {
  test('Single post likes', () => {
    expect(listHelper.totalLikes(blogsData.singleBlog)).toBe(7);
  });

  test('Multiple posts likes', () => {
    expect(listHelper.totalLikes(blogsData.manyBlogs)).toBe(36);
  });

  test('No post likes', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
});

describe('Favorite blog test', () => {
  test('One post should be favorite', () => {
    expect(listHelper.favoritePost(blogsData.singleBlog)).toEqual({
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    });
  });

  test('Many post should return the most liked', () => {
    expect(listHelper.favoritePost(blogsData.manyBlogs)).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    });
  });

  test('Empty array should return empty object', () => {
    expect(listHelper.favoritePost([])).toEqual({});
  });
});

describe('Most blogs test', () => {
  test('Only post should return author', () => {
    expect(listHelper.mostBlogs(blogsData.singleBlog)).toEqual({
      author: 'Michael Chan',
      blogs: 1,
    });
  });

  test('Many post should return the most blogs author', () => {
    expect(listHelper.mostBlogs(blogsData.manyBlogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });

  test('Empty array should return empty object', () => {
    expect(listHelper.mostBlogs([])).toEqual({});
  });
});

describe('Most likes test', () => {
  test('Only post should return author', () => {
    expect(listHelper.mostLikes(blogsData.singleBlog)).toEqual({
      author: 'Michael Chan',
      likes: 7,
    });
  });

  test('Many post should return the most liked author', () => {
    expect(listHelper.mostLikes(blogsData.manyBlogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });

  test('Empty array should return empty object', () => {
    expect(listHelper.mostLikes([])).toEqual({});
  });
});

const router = require('express').Router();
const {
  getAllBlogs,
  postNewBlog,
  putBlog,
  deleteBlog,
} = require('../controllers/controllers');

router.get('/', getAllBlogs);
router.post('/', postNewBlog);
router.delete('/:id', deleteBlog);
router.put('/:id', putBlog);

module.exports = router;

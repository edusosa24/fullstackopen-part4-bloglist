const router = require('express').Router();
const { getAllBlogs, postNewBlog } = require('../controllers/controllers');

router.get('/', getAllBlogs);
router.post('/', postNewBlog);

module.exports = router;

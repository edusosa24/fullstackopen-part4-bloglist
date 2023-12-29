const {
  getAllBlogs,
  postNewBlog,
  putBlog,
  deleteBlog,
} = require('../controllers/blogControllers');
const { postNewUser } = require('../controllers/userControllers');
const { login } = require('../controllers/loginController');
const router = require('express').Router();
const userRouter = require('express').Router();
const loginRouter = require('express').Router();

router.get('/', getAllBlogs);
router.post('/', postNewBlog);
router.delete('/:id', deleteBlog);
router.put('/:id', putBlog);

userRouter.post('/', postNewUser);

loginRouter.post('/', login);

module.exports = {
  router,
  userRouter,
  loginRouter,
};

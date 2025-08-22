const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const expressJoi = require('@escook/express-joi');
const { userCheck } = require('../utils/check');

//用户注册接口
router.post(
  '/register',
  expressJoi(userCheck),
  userController.registerController
);

//用户登录接口
router.post(
  '/login',
  expressJoi(userCheck),
  userController.loginController
);

//用户信息接口
router.get('/userInfo',userController.userInfoController);


module.exports = router;
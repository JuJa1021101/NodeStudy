const express = require('express')

const app = express();

/**
 * 解析post请求的body数据
 */
const bodyParse = require('body-parser');
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

/**
 * 跨域请求配置
 */
const cors = require('cors');
app.use(cors());

/**
 * 解析token效验是否正确、哪些接口需要token效验
 */
const expressJWT = require('express-jwt');
const { jwtSecretKey } = require('./config/jwtSecretKey');
app.use(expressJWT({ secret: jwtSecretKey, algorithms: ['HS256'] }).unless({ path: ['/api/v1/user/login', '/api/v1/user/register'] }))

/**
 * 用户相关的接口
 */
const userRouter = require('./router/user');
app.use('/api/v1/user', userRouter);

/**
 * 课程相关的接口
 */
const courseRouter = require('./router/course');
app.use('/api/v1/course', courseRouter);

/**
 * 错误中间件
 */
const joi = require('joi');
app.use((err, req, res, next) => {
  //joi表单的用户信息效验失败
  if (err instanceof joi.ValidationError) {
    return res.send({
      code: 1,
      message: err.message,
    });
  }
  if(err.name === 'UnauthorizedError'){
    return res.send({
      code: 1,
      message: '身份认证失败'
    })
  }
  //其他错误
  res.send({
    code: 1,
    message: err.message,

  });

})


app.listen(3000, () => {
  console.log('服务器启动成功');
})
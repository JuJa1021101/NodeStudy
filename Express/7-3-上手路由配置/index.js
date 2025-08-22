const express = require('express');
const app = express();
const userRouter = require('./router/user');
const courseRouter = require('./router/course');
//注册用户相关的路由
app.use('/user',userRouter);
//注册课程相关路由
app.use('/course',courseRouter);


app.listen(3000, () => {
  console.log('server run in http://127.0.0.1:3000')
})
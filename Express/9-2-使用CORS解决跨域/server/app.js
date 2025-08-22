const express = require('express');
const app = express();
// const cors = require('cors');
const userRouter = require('./router/user');
const courseRouter = require('./router/course');

// //解决跨域问题
// app.use(cors());
//解释json格式的数据
app.use(express.json());
//解释urlencoded格式的数据
app.use(express.urlencoded({extended:false}));

//用户相关的接口
app.use('/api/v1/user',userRouter);

//课程相关接口
app.use('/api/v1/course',courseRouter);


app.listen(3000,()=>{
  console.log('服务器启动成功');
})
const express = require('express');

const app = express();

//定义中间件函数
const middleware = (req,res,next)=>{
  console.log('执行了中间件a');
  next();
}

// const middlewares = (req,res,next)=>{
//   console.log('执行了中间件b');
//   next();
// }

//顺序执行看注册的顺序
// app.use(middlewares);
// app.use(middleware);


app.post('/login',(req,res)=>{
  res.send('登录成功')
})
app.listen(3000, () => {
  console.log('server run in http://127.0.0.1:3000');
});


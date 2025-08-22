const express = require('express');
const app = express();

const middleware = require('./bodyParse');

app.post('/register',middleware,(req,res)=>{
  console.log(req.body);
  res.send('注册成功')
});

app.listen(3000,()=>{
  console.log('服务器启动成功');
})

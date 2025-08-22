const express = require('express');
const app = express();
const bodyParser = require('body-parser');
////解析json格式数据
// app.use(express.json());
//// 解析urlencoded格式数据
// app.use(express.urlencoded(extended:false));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.post('/register',(req,res)=>{
  console.log(req.body);
  // throw new Error('注册失败');
  res.send('注册成功')
})

app.use ((err,req,res,next)=>{
  res.send(err.message);
  next();
})
app.listen(3000, () => {
  console.log('server run in http://127.0.0.1:3000');
});
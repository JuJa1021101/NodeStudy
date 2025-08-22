const express = require('express');
const app = express();

app.get('/userInfo', (req, res) => {
  console.log(req.query);
  res.send('请求成功');
})



//登录接口
app.post('/login', (req, res) => {
  console.log(req.body);

  /**
   * 登录逻辑
   */
  res.send('登录成功');
})


app.listen(3000, () => {
  console.log('server run in http://127.0.0.1:3000')
})
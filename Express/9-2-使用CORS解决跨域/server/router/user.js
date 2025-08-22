const express = require('express');
const router = express.Router();

//用户登录接口
router.post('/login',(req,res)=>{
  body = req.body;
  res.send({
    code:0, //判断接口请求成功与否 1:失败，0:成功
    data: body
  })
})

module.exports = router;
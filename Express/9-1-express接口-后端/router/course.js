const express = require('express');
const router = express.Router();

//课程查询接口
router.get('/find',(req,res)=>{

  query = req.query;
  console.log(query);
  res.send({
    code: 0, //判断接口请求成功与否 1:失败，0:成功
    data: query
  });
});

module.exports = router;
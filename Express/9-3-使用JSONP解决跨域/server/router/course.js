const express = require('express');
const router = express.Router();

//课程查询接口
router.get('/find',(req,res)=>{

  query = req.query.callback;
  const data ={
    name:'张三',
  }
  console.log(query);
  res.send(
    `${query}(${JSON.stringify(data)})`
  )
  //getData{name:'张三'}
});

module.exports = router;
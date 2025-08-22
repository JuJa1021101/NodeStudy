const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  console.log(req.body);
  res.send('登录成功');
})

router.post('/register', (req, res) => {
  console.log(req.body);
  res.send('注册成功');
})

module.exports = router;


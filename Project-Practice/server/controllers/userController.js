const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jst = require('jsonwebtoken')
const{jwtSecretKey} = require('../config/jwtSecretKey');
/**
 * 注册接口逻辑
 */

exports.registerController = (req, res) => {
  //用户名或密码判空效验
  let { userName, password } = req.body;
  if (!userName || !password) {
    return res.send({
      code: 1,
      message: '用户名或密码不能为空!'
    });
  }

  //用户名查重的逻辑
  const userSelectSql = 'select * from user where name = ?';

  db.query(userSelectSql, userName, (err, results) => {
    if (err) {
      return res.send({
        code: 1,
        message: err.message
      });
    }
    //判断用户是否在数据库中存在
    // console.log(results);
    if (results.length > 0) {
      return res.send({
        code: 1,
        message: '用户名已存在!'
      });
    }

    //用户密码加密
    const bcrypt = require('bcryptjs');
    const passwordB = bcrypt.hashSync(password, 10);

    //随机生成用户头像
    const imgList = [
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/10.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/11.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/12.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/13.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/15.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/16.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/17.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/18.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/19.jpeg',
    ];
    // 随机生成1-10的整数
    const num = Math.floor(Math.random() * 10 + 1);


    // //用户信息插入数据库
    const userInsertSql = 'insert into user(name,pwd,head_img) values(?,?,?)';
    db.query(userInsertSql, [userName, passwordB, imgList[num]], (err, results) => {

      if (err) {
        return res.send({
          code: 1,
          message: err.message
        });
      }
      res.send({
        code: 0,
        message: '注册成功'
      })
    })


  });
};
// //注册接口逻辑
// const sql = 'insert into user (name,pwd,head_img) value("老六","123456","https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/12.jpeg")';
// db.query(sql,(err,data)=>{
//   if(err) {
//     return res.send({
//       code:1,
//       message:err.message
//     })
//   }
//   res.send({
//     code:0,
//     msg:'注册成功'
//   })
//   console.log(data);
// })

// res.send('注册成功');


/**
 * 登录接口逻辑
 */
exports.loginController = (req, res) => {
  let { userName, password } = req.body;
  const userSelectSql = 'select * from user where name=?'
  db.query(userSelectSql, userName, (err, results) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }
    // console.log(results);
    if (results.length === 0) {
      return res.send({ code: 1, message: '账号不存在，请先注册！' });
    }

    //判断密码是否正确
    // console.log(results);
    const compareState = bcrypt.compareSync(password, results[0].pwd);
    // console.log(compareState);
    if (!compareState) {
      return res.send({ code: 1, message: '密码错误!' });
    }

    const user={...results[0],pwd:''};

    const token = jst.sign(user,jwtSecretKey,{expiresIn:'24h'});

    res.send({ code: 0, message: '登录成功',token:'Bearer '+token });

  });
  // res.send('登录成功');
}

/**
 * 用户信息查询逻辑
 */
exports.userInfoController = (req,res)=>{

  //获取Token
  const token = req.headers.authorization;

  //解析token,获取用户数据
  const userInfo = jst.verify(token.split('Bearer ')[1],jwtSecretKey);
  console.log(userInfo);

  res.send({ code: 0, message: '查询成功',data:userInfo })



  // res.send('查询成功');
}

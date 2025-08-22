const joi = require('joi');
// 用户名：1-6位非空白字符
const userName = joi.string().min(1).max(6).required();
// 密码：6-12位非空白字符  
const password = joi.string().min(6).max(12).required();

exports.userCheck = {
  body: {
    userName,
    password,
  },
}


//课程查询参数的校验规则
const category = joi.string().required();
const page = joi.number().integer().required();
const size = joi.number().integer().required();

exports.findCourseCheck={
  query:{
    category,
    page,
    size,
  }
}


//课程修改提交信息校验规则
const title = joi.string();
const price = joi.number().integer();
const id = joi.number().min(1).integer().required();
exports.updateCourseCheck = {
  query: {
    title,
    price,
    id,
  },
};
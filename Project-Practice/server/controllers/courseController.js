const db = require('../config/db');

/**
 * 课程查询接口逻辑
 */
exports.listVideo = (req, res) => { 
  //获取前端参数
  let { category,page, size } = req.query;
  page = (page-1)*size

  //查询课程列表sql
  const pageSql = 'select * from video where del = 0 and  category = ?order by id limit ?,?'

  //查询课程总数
  const totalSql = 'select count(*) as total from video where del = 0 and  category = ?'

  db.query(pageSql,[category,Number(page),Number(size)],(err,resPage) => { 
    if(err) { 
      return res.send({  code:1, message:err.message});
    }
    db.query(totalSql,category,(err,resTotal)=>{
      if(err) { 
        return res.send({  code:1, message:err.message});
      }
      res.send({
        code:0,
        data:{
          list:resPage,
          total:resTotal
        },
     });

    });
  });
  // res.send('课程查询成功');
}


/**
 * 课程修改接口逻辑 
 */
exports.updateVideoById = (req, res) => {
  let { title, price, id } = req.query;
  let arr = [];
  let changeSql = 'update video set ';
  //修改标题和价格
  if (title && price) {
    changeSql = changeSql + 'title=?,price=? where id=?';
    arr = [title, Number(price), Number(id)];
  } else if (title) {
  // 修改课程标题
    changeSql = changeSql + 'title=? where id=?';
    arr = [title, Number(id)];
  } else if (price) {
  // 修改课程价格
    changeSql = changeSql + 'price=? where id=?';
    arr = [Number(price), Number(id)];
  }
  db.query(changeSql, arr, (err, results) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }
    res.send({
      code: 0,
      data: {
        message: '修改成功',
      },
    });
  });
};

/**
 * 课程删除接口逻辑
 */
exports.deleteVideoById = (req, res) => {
  let { id } = req.query;
  let deleteSql = 'update video set del=1 where id=?';
  db.query(deleteSql, id, (err, results) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }
    res.send({
      code: 0,
      data: {
        message: '删除成功',
      },
    });
  });
};
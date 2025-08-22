const mysql = require('mysql');

const db =mysql.createPool({
  host:'47.97.125.99',
  user:'root',
  password:'Zj15185887983',
  database:'xd_course'
});

module.exports = db;

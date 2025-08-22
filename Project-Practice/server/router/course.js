const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi');
const{findCourseCheck,updateCourseCheck,deleteCourseCheck} = require('../utils/check');

const courseController = require('../controllers/courseController');

//课程查询接口

router.get('/find',expressJoi(findCourseCheck),courseController.listVideo);

//课程修改接口

router.get('/update',expressJoi(updateCourseCheck),courseController.updateVideoById);

// 删除课程
router.get('/delete', courseController.deleteVideoById);

module.exports = router;
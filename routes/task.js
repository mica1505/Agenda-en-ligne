const express= require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
router.get('/byMe', taskController.getAllTaskByMe);
router.post('/add', taskController.addTask);
router.get('/delete/:id', taskController.deleteTask);
module.exports = router;
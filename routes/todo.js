const express = require('express');
const router = express.Router();
const todoController = require('../controllers/ToDoController')
router.post("/add", todoController.addToDo);
module.exports = router;
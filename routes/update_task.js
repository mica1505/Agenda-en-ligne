const express = require('express');
const router = express.Router();
const session = require("express-session");
const updateTaskController = require("../controllers/updateTask");
let erreur = undefined;
router.get("/:id",updateTaskController.updateTaskPage);
router.post('/:id', updateTaskController.updateTask);
module.exports = router;
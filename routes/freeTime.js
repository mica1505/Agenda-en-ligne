const express = require('express');
const router = express.Router();
const freeTimeController = require('../controllers/freeTimeController');
router.post("/add",freeTimeController.addFreeTime);
router.get("/delete/:id",freeTimeController.deleteFreeTime);
module.exports = router;
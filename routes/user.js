const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const searchUserController = require('../controllers/searchUserController');
router.post('/login', userController.login);
router.post('/register', userController.inscription);
router.get('/logout', userController.logout);
router.post('/search',(req,res)=>{
    searchUserController.findUser(req,res);
    searchUserController.getFreeTimeId(req,res)
});
router.get('/me', userController.loadUser);
router.post('/update', userController.updateUser)
router.get('/delete', userController.deleteUser)
module.exports = router;
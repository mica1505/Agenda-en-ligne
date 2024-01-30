const express = require("express");
const router = express.Router();
router.get('/',(request,result)=>{
    result.render('connection.ejs',{})
})
module.exports = router;
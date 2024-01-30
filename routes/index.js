const express = require("express");
const router = express.Router();
router.get('/',(request,result)=>{
    console.log(request.session)
    if(!request.session.user){
        console.log("-------------->PAS D'UTILISATEUR<-------------------");
        result.redirect("/connexion");
    }
    else{
        result.render('index',{user : request.session.userName}); 
    } 
})
module.exports = router;
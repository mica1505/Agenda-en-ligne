const express = require('express');
const flash = require('express-flash');
const router = express.Router();
const session = require("express-session");
const register_controller = require("../controllers/register_controller.js");
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
router.get("/",(request,result)=>{
    let erreur;
    if(register_controller.errors){
        erreur = register_controller.errors;
        register_controller.errors = undefined;
    }
    else{
        error = [];
    }
    result.render('register.ejs',{erreur : erreur});
})
router.post('/', (req,res) => {
  console.log('je suis dans le post')
})
module.exports = router;
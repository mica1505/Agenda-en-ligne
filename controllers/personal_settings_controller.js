const { body, validationResult } = require("express-validator");
const User = require("../models/User");
let error = [];
exports.personalSettings = [
    body("nom_inscription").trim().isLength({ min:1}).withMessage("Veuillez remplir tous les champs.")
    .escape(),
    body("prenom_inscription").trim().isLength({min:1}).withMessage("Veuillez remplir tous les champs.")
    .escape(),
    body("date_naissance").trim()
    .isDate().isISO8601().withMessage("La date n'est pas valide.").escape(),
    body("email_inscription").trim().isLength({ min: 1 }).withMessage("Veuillez remplir tous les champs.")
    .isEmail().withMessage("Veuillez saisir une adresse email valide.").normalizeEmail().escape(),
    body("mPasse_inscription").trim().isLength({min:8}).withMessage("Votre mot de passe est trop court (< 8 caractéres).").escape(),
    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        error = errors.array()[0].msg;
        exports.errors = error;
        res.redirect("/inscription");  
        console.log('errors : ',error,'\n\n');
    } 
    else{
      User.findAll({
        attributes : ["email"],
        where : {
          email: req.body.email_inscription,
        }
    }).then(user => {
      if(user == 0){
        console.log("\n-------------------------------------ajoute dans la BDD------------------------------------\n")
        User.create({
          email : req.body.email_inscription,
          password : req.body.mPasse_inscription,
          user_name : "cc1",
          first_name : req.body.nom_inscription,
          last_name : req.body.prenom_inscription,
          date_birth : req.body.date_naissance
        })
        res.redirect("/connexion");
      }else{
        console.log("J'existe");
        res.render("connexion.ejs", {erreur : "Compte déjà existant. Veuillez vous connecter."});
        } 
        }
    )
    }
  }
]
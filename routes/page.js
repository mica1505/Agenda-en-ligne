const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const searchUserController = require("../controllers/searchUserController");
router.get('/',pageController.indexPage);
router.get('/recherche',pageController.recherchePage);
router.post('/recherche',(req,res)=>{
    searchUserController.findUser(req,res);
    searchUserController.getFreeTimeId(req,res)
});
router.get('/connexion', pageController.connexionPage);
router.get("/inscription",pageController.inscriptionPage);
router.get("/creationTache", pageController.addTaskPage);
router.get("/deconnexion", pageController.deconnexionPage);
router.get("/rendezVous", pageController.freeTimePage);
router.get('/todo', pageController.todoPage);
router.get('/welcome', pageController.welcomePage);
router.get('/evenements', pageController.allTaskPage);
router.get('/settings', pageController.settingsPage);
router.get('/settings/personal', pageController.personalSettingsPage);
router.get('/settings/opinion', pageController.opinionSettingsPage);
router.get('/AboutUs', pageController.aboutUsPage);
router.get('/settings/AboutUs', pageController.settingsAboutUsPage);
module.exports = router;
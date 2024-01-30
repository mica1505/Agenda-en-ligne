const { Freetime, Todo, User, Task } = require('../models')
const moment = require("moment");
const emailSender = require("./emailController");
const {Op}=require("sequelize");
exports.connexionPage = (req,res)=>{
    let error;
    let success;

    if (req.flash.success) {
        success = req.flash.success;
        req.flash.success = undefined;
    }
    if(req.flash.error){ 
        error = req.flash.error;
        req.flash.error = undefined;
    }
    res.render("connection.ejs",{erreur : error, success});
}
exports.inscriptionPage = (req, res) => {
    let error;
    let success;
    if (req.flash.success) {
        success = req.flash.success;
        req.flash.success = undefined;
    }
    if(req.flash.error){ 
        error = req.flash.error;
        req.flash.error = undefined;
    }
    res.render("register.ejs",{erreur : error, success});
}
exports.indexPage = async (req, res) => {
    if(!req.session.user){
        res.redirect("/Welcome");
    }
    else{
        let tasks,freeTimes;
        await Task.findAll({
            where :{
                idUser : req.session.userId,        
            },
            order: [['date', 'ASC'], ['start', 'ASC']],
            raw : true,
        }).then(result => {
            result.forEach(element => {
                element.date = moment.tz(element.date,'Europe/Paris').locale('fr').format("YYYY-MM-DD");
                element.date_end = moment.tz(element.date_end,'Europe/Paris').locale('fr').format("YYYY-MM-DD");
            });
            tasks = result;
        })
        await Freetime.findAll({
            where :{
                idUser : req.session.userId,        
            },
            order: [['date', 'ASC'], ['start', 'ASC']],
            raw : true,
        }).then(result => {
            result.forEach(element => {
                element.date = moment.tz(element.date,'Europe/Paris').locale('fr').format("YYYY-MM-DD");
                element.date_end = moment.tz(element.date_end,'Europe/Paris').locale('fr').format("YYYY-MM-DD");
            });
            freeTimes = result;
        })
        emailSender.sendEmail(req,res);
        res.render('index',{user : req.session.userName, eventDisplay : tasks,freeTimeDisplay : freeTimes}); 
    } 
}
exports.addTaskPage = (req,res)=>{
    let error;
    let success;
    if (req.flash.success) {
        success = req.flash.success;
        req.flash.success = undefined;
    }
    if(req.flash.error){ 
        error = req.flash.error;
        req.flash.error = undefined;
    }
    if(!req.session.user){
        res.redirect("/welcome");
    }
    else{
        emailSender.sendEmail(req,res);
        res.render("add_task.ejs",{error : error, success:success});
    }
}
exports.deconnexionPage = (req, res) => {
    delete req.session.userName;
    delete req.session.user;
    delete req.session.userId;
    res.redirect("/welcome");
}
exports.freeTimePage = async (req,res)=>{
    if(!req.session.user){
        res.redirect("/Welcome");
    }
    else{
        let error;
        let success;
        if (req.flash.success) {
            success = req.flash.success;
            req.flash.success = undefined;
        }
        if(req.flash.error){ 
            error = req.flash.error;
            req.flash.error = undefined;
        }
        await Freetime.findAll({
            where :{
                idUser : req.session.userId, 
                date : {[Op.gte] : moment.tz('Europe/Paris').format("YYYY-MM-DD")}   
                //start : req.body.startFreeTime,      
            },
            order: [['date', 'ASC'], ['start', 'ASC']],
            raw : true,
        }).then(result => {
            result.forEach(element => {
                element.start = element.start.substring(0, 5);
                element.end = element.end.substring(0, 5);
                element.date = moment.tz(element.date,'Europe/Paris').format("DD/MM/YYYY");
                element.date_end = moment.tz(element.date_end,'Europe/Paris').format("DD/MM/YYYY");
            });
            console.log(result);
            freeTime = result;
        })
        res.render("free_time.ejs",{error : error,success:success, freeTime : freeTime});
    }
}
exports.recherchePage = async (req, res) => {
    if(!req.session.user){
        res.redirect("/Welcome");
    }
    else{
        let error;
        if(req.flash.error){ 
            error = req.flash.error;
            req.flash.error = undefined;
        }
        res.render("search_user.ejs",{error : error});
    }
}
exports.todoPage = async (req, res) => {
    if(!req.session.user){
        res.redirect("/welcome");
    }
    else{
        const toDoList = await Todo.findAll({
            attributes : ["id","description"],
            where : {idUser : req.session.userId},
            raw : true,
        }) 
        res.render('to_do.ejs',{toDoList : toDoList}); 
    } 
}

exports.welcomePage = async (req, res) => {
    res.render('welcome',{user : req.session.userName}); 
}

exports.allTaskPage = async (req, res) => {
    if(!req.session.user){
        res.redirect("/Welcome");
    }
    else{
        let tasks;
        var success;

        if (req.flash.success) {
            success = req.flash.success;
            req.flash.success = undefined;
        }
        if(req.flash.error){ 
            error = req.flash.error;
            req.flash.error = undefined;
        }
        await Task.findAll({
            where :{
                idUser : req.session.userId,  
                date : {[Op.gte] : moment.tz('Europe/Paris').format("YYYY-MM-DD")} 
            },
            order: [['date', 'ASC'], ['start', 'ASC']],
            raw : true,
        }).then(result => {
            result.forEach(element => {
                element.start = element.start.substring(0, 5);
                element.end = element.end.substring(0, 5);
                element.date = moment.tz(element.date,'Europe/Paris').locale('fr').format("DD/MM/YYYY");
                element.date_end = moment.tz(element.date_end,'Europe/Paris').locale('fr').format("DD/MM/YYYY");
            });
            console.log("ALL TAAAAAAAAASKS : ",result);
            tasks = result;
        })
        emailSender.sendEmail(req,res);
        res.render('all_tasks',{user : req.session.userName, tasks : tasks,success:success}); 
    } 
}
exports.settingsPage = async (req, res) => {
    if(!req.session.user){
        res.redirect("/welcome");
    }
    else{
        let error;
        let success;
        if (req.flash.success) {
            success = req.flash.success;
            req.flash.success = undefined;
        }
        if(req.flash.error){ 
            error = req.flash.error;
            req.flash.error = undefined;
        }
        const user = await User.findOne({
            where: {id: req.session.userId}
        })
        user.date_birth_parse = moment.tz(user.date_birth,'Europe/Paris').format("YYYY-MM-DD");
        res.render('settings',{error : error,success:success, user : user}); 
    } 
}
exports.personalSettingsPage = async (req, res) => {
    if(!req.session.user){
        res.redirect("/welcome");
    }
    else{
        let error;
        let success;

        if (req.flash.success) {
            success = req.flash.success;
            req.flash.success = undefined;
        }
        if(req.flash.error){ 
            error = req.flash.error;
            req.flash.error = undefined;
        }

        const user = await User.findOne({
            where: {id: req.session.userId}
        })
        let date = new Date(user.date_birth);
        let date_birth_parse = moment.tz(user.date_birth,'Europe/Paris').format("YYYY-MM-DD");
        user.date_birth_parse = (date.getFullYear() == 1 && date.getMonth() == 0 && date.getDate() == 1)?null : date_birth_parse;
        res.render('personal_settings',{error : error,success:success, user : user}); 
    } 
}
exports.opinionSettingsPage = async (req, res) => {
    if(!req.session.user){
        res.redirect("/welcome");
    }
    else{
        res.render('opinions',{}); 
    } 
}
exports.aboutUsPage = async (req, res) => {
    res.render('who_are_we',{user : req.session.userName}); 
}
exports.searchUser = async (req, res) => {
    if(!req.session.user){
        res.redirect("/Welcome");
    }
    else{
        let error;
        if(req.flash.error){ 
            error = req.flash.error;
            req.flash.error = undefined;
        }
        res.render("search_user.ejs",{error : error});
    }
}
exports.settingsAboutUsPage = async (req,res)=>{
    if(!req.session.user){
        res.redirect("/Welcome");
    }
    else{
        res.render("contact.ejs");
    }
}
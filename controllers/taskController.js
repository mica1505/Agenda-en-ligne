const {body, validationResult, sanitizeBody} = require("express-validator");
const {Sequelize, Op} = require('sequelize');
const { Freetime,Task }= require("../models");
const moment = require("moment");
catchErrorTask = (validationError)=>{
    let error = [];
    if(!validationError.isEmpty()){
        error = validationError.array()[0].msg;
        console.log("JE SUIS DANS LA FONCTION-------"+error);
    }
    return error;
}
exports.addTask = [
    body("name").trim().isLength({min : 1}).withMessage("Veuillez remplir le champ Nom").escape(),
    body("date").isLength({min:1}).withMessage("Veuillez remplir le champ date de début.").isDate().isISO8601().withMessage("La date n'est pas valide").escape()
    .custom((value, { req }) => {
        let today = new Date();
        let dateValue = new Date(value);
        console.log('--------------->value',dateValue,"-------------->today",today);
        let errDateStart = (today.getFullYear() > dateValue.getFullYear() || (today.getMonth() > dateValue.getMonth() && today.getFullYear() >= dateValue.getFullYear()) || (today.getDate() > dateValue.getDate() && today.getMonth() >= dateValue.getMonth() && today.getFullYear() >= dateValue.getFullYear()));
        if (errDateStart) {
          throw new Error("La date d'un événement doit être supérieure ou égale à la date d'aujourd'hui.");
        }
        return true;
      }),
    body("date_end").isLength({min:1}).withMessage("Veuillez remplir le champ date de fin.").isDate().isISO8601().withMessage("La date n'est pas valide").escape()
    .custom((value, { req }) => {
          let today = new Date();
          let dateValue = new Date(value);
          let dateStart = new Date(req.body.date);
          console.log('--------------->value',dateValue,"-------------->today",today);
          let errDateEndToday = (today.getFullYear() > dateValue.getFullYear() || (today.getMonth() > dateValue.getMonth() && today.getFullYear() >= dateValue.getFullYear()) || (today.getDate() > dateValue.getDate() && today.getMonth() >= dateValue.getMonth() && today.getFullYear() >= dateValue.getFullYear()));
          let errDateEndStart = (dateValue.getFullYear() < dateStart.getFullYear() || (dateValue.getFullYear() <= dateStart.getFullYear() && dateValue.getMonth() < dateStart.getMonth()) || (dateValue.getFullYear() <= dateStart.getFullYear() && dateValue.getMonth() <= dateStart.getMonth() && dateValue.getDate() < dateStart.getDate()));
          if (errDateEndToday) {
            throw new Error("La date de début d'un événement doit être supérieure ou égale à la date d'aujourd'hui.");
          }
          else if(errDateEndStart){
            throw new Error("La date de fin d'un événement doit être supérieure ou égale à sa date de début.");
          }
          return true;
    }),
    body("start").isLength({min:1}).withMessage("Veuillez remplir le champ Heure de début.").escape(),
    body("end").isLength({min:1}).withMessage("Veuillez remplir le champ Heure de fin.").escape().custom((value, { req }) => {
        let dateStart = new Date(req.body.date);
        let dateEnd = new Date(req.body.date_end);
        console.log('<------->',dateStart, dateEnd,'<----------------->');
        let dateEqual = (dateStart.getFullYear() == dateEnd.getFullYear() && dateStart.getMonth() == dateEnd.getMonth() && dateStart.getDate() == dateEnd.getDate());
        if(dateEqual){
            console.log("-------------dateEqual------------------");
            if (value < req.body.start) {
                throw new Error('L\'heure de fin doit être supérieure à l\'heure de début');
            } 
        }
        return true;
    }),
    body("description").trim().isLength({max : 1000}).withMessage("Vous avez dépassé le nombre de caractères autorisés").escape(),
    async (req, res) =>{
        const errors = catchErrorTask(validationResult(req));
        console.log("------------------------------IMPORTSSSSS------------------------------", Task,Freetime);
        let dateStart = new Date(req.body.date);
        let dateEnd = new Date(req.body.date_end);
        let dateEqual = (dateStart.getFullYear() == dateEnd.getFullYear() && dateStart.getMonth() == dateEnd.getMonth() && dateStart.getDate() == dateEnd.getDate());
        let existingTask;
        if(errors.length>0){
            req.flash.error = errors;
            res.redirect("/creationTache");
        }else{
            console.log(req.session);
            console.log(moment.tz(req.body.date, 'Europe/Paris').toDate());

            existingTask = await Task.findOne({
                where: {
                    idUser: req.session.userId,
                    [Op.or] : [
                        {
                            date: moment.tz(req.body.date, 'Europe/Paris').toDate(),
                            [Op.or] : [
                            {[Op.and]:[{start : {[Op.lte] : req.body.start}},{end : {[Op.gte] : req.body.start}}]},
                            {[Op.and] : [{start : {[Op.lte] : req.body.end}},{end : {[Op.gte] : req.body.end}}]},
                            {[Op.and] : [{start : {[Op.gte] : req.body.start}},{end : {[Op.lte] : req.body.end}}]}  ]
                        },
                        {
                            date_end: moment.tz(req.body.date_end, 'Europe/Paris').toDate(),
                            [Op.or] : [
                            {[Op.and]:[{start : {[Op.lte] : req.body.start}},{end : {[Op.gte] : req.body.start}}]},
                            {[Op.and] : [{start : {[Op.lte] : req.body.end}},{end : {[Op.gte] : req.body.end}}]},
                            {[Op.and] : [{start : {[Op.gte] : req.body.start}},{end : {[Op.lte] : req.body.end}}]}  ]
                        }
                    ]     
                }
            });
            const existingFreeTime = await Freetime.findOne({
                where: {
                    idUser: req.session.userId,
                    [Op.or] : [
                        {
                            date: moment.tz(req.body.date, 'Europe/Paris').toDate(),
                            [Op.or] : [
                            {[Op.and]:[{start : {[Op.lte] : req.body.start}},{end : {[Op.gte] : req.body.start}}]},
                            {[Op.and] : [{start : {[Op.lte] : req.body.end}},{end : {[Op.gte] : req.body.end}}]},
                            {[Op.and] : [{start : {[Op.gte] : req.body.start}},{end : {[Op.lte] : req.body.end}}]}  ]
                        },
                        {
                            date_end: moment.tz(req.body.date_end, 'Europe/Paris').toDate(),
                            [Op.or] : [
                            {[Op.and]:[{start : {[Op.lte] : req.body.start}},{end : {[Op.gte] : req.body.start}}]},
                            {[Op.and] : [{start : {[Op.lte] : req.body.end}},{end : {[Op.gte] : req.body.end}}]},
                            {[Op.and] : [{start : {[Op.gte] : req.body.start}},{end : {[Op.lte] : req.body.end}}]}  ]
                        }
                    ]     
                }
            });
            if (existingTask || existingFreeTime) {
                console.log('resultat de jointure',existingTask);
                req.flash.error = "Vous avez déjà un événement prévu à cette date.";
                res.redirect("/creationTache");
            } else {
                console.log("YA PAS DE TASK");
                await Task.create({
                    name : req.body.name,
                    date : moment.tz(req.body.date, 'Europe/Paris').toDate(),
                    date_end : moment.tz(req.body.date_end, 'Europe/Paris').toDate(),
                    adress : req.body.adress,
                    description: req.body.description,
                    important : (req.body.important)? true : false,
                    start : req.body.start,
                    end :req.body.end,
                    idUser : req.session.userId,
                })
                req.flash.success = `Votre événement ${req.body.name} a été ajouté`;
 
                res.redirect("/creationTache");
                console.log(req.flash.success,'-------------------->');
            }
        }
    }
]
exports.getAllTaskByMe = async (req, res) => {
    const tasks = await Task.findAll({
        where: {
            idUser: req.session.userId
        }
    });
    res.send(tasks);
}
exports.getAllTaskByUser = async (req, res) => {
    const idUser = parseInt(req.params.id, 10);
    const tasks = await Task.findAll({
        where: {
            idUser,
        }
    })
    res.send(tasks);
}
exports.deleteTask = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        req.flash.error = 'Tâche non trouvé';
        res.redirect('/allTask');
    }
    const task = await Task.findOne({
        where: {
            id
        }
    });
    if (!task) {
        req.flash.error = 'Tâche non trouvé';
        res.redirect('/allTask');
    } else {
        await Task.destroy({
            where: {id}
        })
        req.flash.success = `Tâche ${task.name} supprimé !`;
        res.redirect('/evenements');
    }
}
exports.updateTask = [
    body("name").trim().isLength({min : 1}).withMessage("Veuillez remplir le champ Nom").escape(),
    body("date").isLength({min:1}).withMessage("Veuillez remplir le champ Date.").isDate().isISO8601().withMessage("La date n'est pas valide").escape(),
    body("start").isLength({min:1}).withMessage("Veuillez remplir le champ Heure de début.").escape(),
    body("end").escape(),
    body("description").trim().isLength({max : 1000}).withMessage("Vous avez dépassé le nombre de caractères autorisés")
    .escape(),
    async(req, res) =>{
        const errors = catchErrorTask(validationResult(req));
        if(errors.length>0){
            req.flash.error = errors;
            res.redirect("/modificationTache/1");
        }else{
            let canAdd = verifyTask(req,res);
            const taskId = req.params.id;
            const { name, date, start, end, adress, important, description } = req.body;
            Task.findByPk(taskId)
                .then((task) => {
                    console.log(taskId,task)
                    if (!task) {
                        return res.status(404).send('Task not found');
                    }
                    task.name = name;
                    task.date = date;
                    task.start = start;
                    task.end = end;
                    task.adress = adress;
                    task.important = important;
                    task.description = description;
                    console.log(task)
                    return task.save();
                    })
                    .then(() => {
                    res.redirect('/connexion');
                    })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Une erreur s\'est produite lors de la mise à jour de la tâche');
                });
        }
    }
]
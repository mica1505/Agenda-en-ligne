const {body, validationResult, sanitizeBody} = require("express-validator");
const moment=require("moment");
const {Op} = require("sequelize");
const { Task,Freetime } = require('../models');
catchErrorUpdate = (validationError)=>{
    let error = [];
    if(!validationError.isEmpty()){
        error = validationError.array()[0];
        console.log("JE SUIS DANS LA FONCTION-------"+error);
    }
    return error;
}
verifyTask = (req,res)=>{
    let exists = false;
    return exists;
    } 
sendData = async (req,res) => {            
            const taskId = req.params.id;
            const { name, date, start, end, adress, important, description } = req.body;
            //Recuperer la tache avec taskID de la bd
            console.log("------DANS SEND DATA-----------");
            Task.findByPk(taskId)
                .then((task) => {
                    console.log(taskId,task)
                if (!task) {
                    // Gérer l'erreur si la tâche avec l'ID spécifié n'existe pas
                    return res.status(404).send('Task not found');
                }
                // Mettre à jour les propriétés de la tâche avec les nouvelles valeurs du formulaire
                task.name = name;
                task.date = date;
                task.start = start;
                task.end = end;
                task.adress = adress;
                task.important = (req.body.important)? true : false;
                task.description = description;
                task.date_end = date_end;
                // Enregistrer les modifications dans la base de données
                return task.save();
                })
                .then(() => {
                res.redirect('/evenements');
                })
                .catch((error) => {
                // Gérer l'erreur
                console.error(error);
                res.status(500).send('Une erreur s\'est produite lors de la mise à jour de la tâche');
                });
}
exports.updateTask = [
    body("name").trim().isLength({min : 1}).withMessage("Veuillez remplir le champ Nom").escape(),
    body("date").isLength({min:1}).withMessage("Veuillez remplir le champ Date de debut.").isDate().isISO8601().withMessage("La date n'est pas valide").escape()    .custom((value, { req }) => {
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
      }),
    body("start").isLength({min:1}).withMessage("Veuillez remplir le champ Heure de debut.").escape(),
    body("end").escape().custom((value, { req }) => {
        let dateStart = new Date(req.body.date);
        let dateEnd = new Date(req.body.date_end);
        //console.log('<------->',dateStart, dateEnd,'<----------------->');
        let dateEqual = (dateStart.getFullYear() == dateEnd.getFullYear() && dateStart.getMonth() == dateEnd.getMonth() && dateStart.getDate() == dateEnd.getDate());
        if(dateEqual){
            console.log("-------------dateEqual------------------");
            if (value < req.body.start) {
                throw new Error('L\'heure de fin doit être supérieure à l\'heure de début');
            } 
        }
    }),
    body("description").trim().isLength({max : 1000}).withMessage("Vous avez dépassé le nombre de caractères autorisés")
    .escape(),
    async(req, res) =>{
        console.log("DANS UPDATE TASK ::::::::::::>",req.body);
        const errors = catchErrorUpdate(validationResult(req));
        if(errors.length>0){
            req.flash.error = errors;
            res.redirect(`/modificationTache/${req.params.id}`);
        }else{
            const existingTask = await Task.findOne({
                where: {
                    idUser: req.session.userId,
                    id : {[Op.not]:req.params.id},
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
                req.flash.error = "Vous avez déjà un événement prévu à cette date.";
                res.redirect("/creationTache");
            } else {
                const taskId = req.params.id;
                const { name, date,date_end, start, end, adress, description, important } = req.body;
                //Recuperer la tache avec taskID de la bd
                console.log("------DANS SEND DATA-----------");
                Task.update({
                    name : name,
                    date : date,
                    start : start,
                    end : end,
                    adress : adress,
                    important : (important)? true : false,
                    description : description,
                    date_end : date_end,
                },
                {where : {id : parseInt(req.params.id, 10)}})
                .then((tt) => {
                    console.log("APRES UPDATE", tt);
                    res.redirect('/evenements');})
                .catch((error) => {
                console.error(error);
                res.status(500).send('Une erreur s\'est produite lors de la mise à jour de la tâche');});
        }
        }
    }
]
exports.updateTaskPage = async (req,res)=>{
    if(!req.session.userName){
        res.redirect("/welcome");
    }else{
        let error;
        let task = await Task.findOne({
            where :{
                id : parseInt(req.params.id, 10),
            }
        });
        task.dateStart = moment.tz(task.date,'Europe/Paris').format("YYYY-MM-DD");
        task.dateEnd = moment.tz(task.date_end,'Europe/Paris').format("YYYY-MM-DD");
        if(req.flash.error){ 
            error = req.flash.error;
            req.flash.error = undefined;
        }
        res.render("update_task.ejs",{error : error,task:task});
    }
}
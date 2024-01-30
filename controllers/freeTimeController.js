const {body,validationResult } = require("express-validator");
const moment = require("moment");
const { Freetime,Task } = require('../models');
const {Op} = require("sequelize");
catchErrorsFreeTime = (validationError)=>{
    let error = [];
    if(!validationError.isEmpty()){
        error = validationError.array()[0].msg;
    }
    return error;
}
exports.addFreeTime = [
    body("dateFreeTime").trim().isLength({min:1}).withMessage("Veuillez remplir le champ date de début.").isDate().isISO8601().withMessage("La date n'est pas valide").escape()
    .custom((value, { req }) => {
        let today = new Date();
        let dateValue = new Date(value);
        console.log('--------------->value',dateValue,"-------------->today",today);
        let errDateStart = (today.getFullYear() > dateValue.getFullYear() || (today.getMonth() > dateValue.getMonth() && today.getFullYear() >= dateValue.getFullYear()) || (today.getDate() > dateValue.getDate() && today.getMonth() >= dateValue.getMonth() && today.getFullYear() >= dateValue.getFullYear()));
        if (errDateStart) {
          throw new Error("La date d'un d'horaire libre doit être supérieure ou égale à la date d'aujourd'hui.");
        }
        return true;
      }),
    body("dateEndFreeTime").trim().isLength({min:1}).withMessage("Veuillez remplir le champ date de fin.").isDate().isISO8601().withMessage("La date n'est pas valide").escape()
    .custom((value, { req }) => {
        let today = new Date();
        let dateValue = new Date(value);
        let dateStart = new Date(req.body.dateFreeTime);
        console.log('--------------->value',dateValue,"-------------->today",today);
        //modified
        //si inferieure a la date d'ajourd'hui
        let errDateEndToday = (today.getFullYear() > dateValue.getFullYear() || (today.getMonth() > dateValue.getMonth() && today.getFullYear() >= dateValue.getFullYear()) || (today.getDate() > dateValue.getDate() && today.getMonth() >= dateValue.getMonth() && today.getFullYear() >= dateValue.getFullYear()));
        //si inferieure a date de debut
        let errDateEndStart = (dateValue.getFullYear() < dateStart.getFullYear() || (dateValue.getFullYear() <= dateStart.getFullYear() && dateValue.getMonth() < dateStart.getMonth()) || (dateValue.getFullYear() <= dateStart.getFullYear() && dateValue.getMonth() <= dateStart.getMonth() && dateValue.getDate() < dateStart.getDate()));
        if (errDateEndToday) {
          throw new Error("La date de début d'un événement doit être supérieure ou égale à la date d'aujourd'hui.");
        }
        else if(errDateEndStart){
          throw new Error("La date de fin d'un événement doit être supérieure ou égale à sa date de début.");
        }
        return true;
    }),
    //erreur mot de passe
    body("startFreeTime").trim().isLength({min:1}).withMessage("Veuillez remplir le champ Heure de début.").escape(),

    body("endFreeTime").trim().isLength({min:1}).withMessage("Veuillez remplir le champ Heure de fin.").escape().custom((value, { req }) => {
        let dateStart = new Date(req.body.dateFreeTime);
        let dateEnd = new Date(req.body.dateEndFreeTime);
        console.log('<------->',dateStart, dateEnd,'<----------------->');
        let dateEqual = (dateStart.getFullYear() == dateEnd.getFullYear() && dateStart.getMonth() == dateEnd.getMonth() && dateStart.getDate() == dateEnd.getDate());
        if(dateEqual){
            console.log("-------------dateEqual------------------");
            if (value < req.body.startFreeTime) {
                throw new Error('L\'heure de fin doit être supérieure à l\'heure de début');
            } 
        }
        return true;
    }),
    async (req, res, next) => {
        const errors = catchErrorsFreeTime(validationResult(req));
        let dateStart = new Date(req.body.dateFreeTime);
        let dateEnd = new Date(req.body.dateEndFreeTime);
        if (errors.length > 0) {
            req.flash.error = errors;
            res.redirect("/rendezVous");  
        } 
        else{
            console.log("recherche horaire libre qui ",req.body);
            console.log(Freetime,'----------->');
            const freeTimeExist = await Freetime.findOne({
                where: {
                    idUser: req.session.userId,
                    [Op.or] : [
                        {
                            date: moment.tz(req.body.dateFreeTime, 'Europe/Paris').toDate(),
                            [Op.or] : [
                            {[Op.and]:[{start : {[Op.lte] : req.body.startFreeTime}},{end : {[Op.gte] : req.body.startFreeTime}}]},
                            {[Op.and] : [{start : {[Op.lte] : req.body.endFreeTime}},{end : {[Op.gte] : req.body.endFreeTime}}]},
                            {[Op.and] : [{start : {[Op.gte] : req.body.startFreeTime}},{end : {[Op.lte] : req.body.endFreeTime}}]}  ]
                        },
                        {
                            date_end: moment.tz(req.body.dateEndFreeTime, 'Europe/Paris').toDate(),
                            [Op.or] : [
                            {[Op.and]:[{start : {[Op.lte] : req.body.startFreeTime}},{end : {[Op.gte] : req.body.startFreeTime}}]},
                            {[Op.and] : [{start : {[Op.lte] : req.body.endFreeTime}},{end : {[Op.gte] : req.body.endFreeTime}}]},
                            {[Op.and] : [{start : {[Op.gte] : req.body.startFreeTime}},{end : {[Op.lte] : req.body.endFreeTime}}]}  ]
                        }
                    ]     
                },
                raw: true,
            });
            console.log('--------------------------------DANS FREE TIME RECHERCHE FREETIME---------------------------------',freeTimeExist);
            const taskExist = await Task.findOne({
                where: {
                    idUser: req.session.userId,
                    [Op.or] : [
                        {
                            date: moment.tz(req.body.dateFreeTime, 'Europe/Paris').toDate(),
                            [Op.or] : [
                            {[Op.and]:[{start : {[Op.lte] : req.body.startFreeTime}},{end : {[Op.gte] : req.body.startFreeTime}}]},
                            {[Op.and] : [{start : {[Op.lte] : req.body.endFreeTime}},{end : {[Op.gte] : req.body.endFreeTime}}]},
                            {[Op.and] : [{start : {[Op.gte] : req.body.startFreeTime}},{end : {[Op.lte] : req.body.endFreeTime}}]}  ]
                        },
                        {
                            date_end: moment.tz(req.body.dateEndFreeTime, 'Europe/Paris').toDate(),
                            [Op.or] : [
                            {[Op.and]:[{start : {[Op.lte] : req.body.startFreeTime}},{end : {[Op.gte] : req.body.startFreeTime}}]},
                            {[Op.and] : [{start : {[Op.lte] : req.body.endFreeTime}},{end : {[Op.gte] : req.body.endFreeTime}}]},
                            {[Op.and] : [{start : {[Op.gte] : req.body.startFreeTime}},{end : {[Op.lte] : req.body.endFreeTime}}]}  ]
                        }
                    ] 
                },
                raw: true,
            });
            console.log('--------------------------------DANS FREE TIME RECHERCHE TASK---------------------------------',taskExist);
            if (freeTimeExist || taskExist) {
                console.log('resultat ',freeTimeExist);
                req.flash.error = "Vous avez déjà un événement à cette date.";
                res.redirect("/rendezVous");
            } else {
                console.log(freeTimeExist, 'newFreeTime');
                await Freetime.create({
                    date : moment.tz(req.body.dateFreeTime,'Europe/Paris').toDate(),
                    start : req.body.startFreeTime,
                    end : req.body.endFreeTime, 
                    idUser : req.session.userId,
                    date_end : moment.tz(req.body.dateEndFreeTime,'Europe/Paris').toDate(),
                });
                req.flash.success = 'Enregistré !';
                res.redirect("/rendezVous");
            }
        }
    }
]
exports.deleteFreeTime = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        req.flash.error = 'Freetime non trouvé';
        res.redirect('/rendezVous');
    }
    const freeTime = await Freetime.findOne({
        where: {
            id
        }
    });
    if (!freeTime) {
        req.flash.error = 'Freetime non trouvé';
        res.redirect('/rendezVous');
    } else {
        const a = await freeTime.destroy({
            where: {id}
        })
        console.log(a);
        console.log(req.flash)
        req.flash.success = `Freetime supprimé !`;
        res.redirect('/rendezVous');
    }
}
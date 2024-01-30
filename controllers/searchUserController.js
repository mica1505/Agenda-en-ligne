const {Freetime, User, Task} = require("../models");
const {Op} = require('sequelize');
const moment = require('moment');
exports.findUser = async (req,res)=>{
    console.log('recherche user dans searchUserController findUser',req.body)
    if(req.body.user_name){
        User.findAll({
            where : {
                user_name :{
                    [Op.not]:req.session.userName,
                    [Op.iLike]:`%${req.body.user_name}%`,
                }
            },
            order: [['user_name', 'ASC']],
            raw : true,
        }).then(user =>{
            res.send(user);
        })
    }
    if(req.body.selected_user){
        console.log('POST user click' , req.body.selected_user, "DATEEEEEEEEEEEEEEEEEE",moment.tz('Europe/Paris').format("YYYY-MM-DD"));
        Freetime.findAll({
            where:{
                idUser: parseInt(req.body.selected_user, 10),
                date : {[Op.gte] : moment.tz('Europe/Paris').format("YYYY-MM-DD")}
            },
            order: [['date', 'ASC'], ['start', 'ASC']],
            raw : true,
        }).then(freeTime=> {
            freeTime.forEach(elem => {
            elem.date = moment.tz(elem.date,'Europe/Paris').format("DD/MM/YYYY");
            elem.date_end = moment.tz(elem.date_end,'Europe/Paris').format("DD/MM/YYYY");
        });
        console.log("Affichage des horaires libre du user selectionne : ",freeTime);
        res.send(freeTime);
    })
    }
}
exports.getFreeTimeId = async (req,res) =>{
    //console.log("++++++++==> clique sur un horaire ",req.body);
    if(req.body.userId && req.body.id){
        var messageErr = "";
        var messageSucc = "";
        var userId = req.body.userId;
        var userName = req.body.userName;
        //console.log("++++++++==>",req.body, userId, userName, req.session.userName);
        await Freetime.findOne({
            where :{
                id : parseInt(req.body.id, 10),
            },
            raw : true,
        }).then(async task => {
            console.log('resultat recherche horaire libre dans la BDD pour recuperer les donnees',task);
            const existFT = await Freetime.findOne({
                where: {
                    idUser: req.session.userId,
                    [Op.or] : [
                        {
                            date: task.date,
                            [Op.or] : [
                            {[Op.and]:[{start : {[Op.lte] : task.start}},{end : {[Op.gte] : task.start}}]},
                            {[Op.and] : [{start : {[Op.lte] : task.end}},{end : {[Op.gte] : task.end}}]},
                            {[Op.and] : [{start : {[Op.gte] : task.start}},{end : {[Op.lte] : task.end}}]}  ]
                        },
                        {
                            date_end: task.date_end,
                            [Op.or] : [
                            {[Op.and]:[{start : {[Op.lte] : task.start}},{end : {[Op.gte] : task.start}}]},
                            {[Op.and] : [{start : {[Op.lte] : task.end}},{end : {[Op.gte] : task.end}}]},
                            {[Op.and] : [{start : {[Op.gte] : task.start}},{end : {[Op.lte] :task.end}}]}  ]
                        }
                    ]     
                }
            });
            console.log("FT---------->",existFT);
            await Task.findOne({
                where : {
                    idUser: req.session.userId,
                    [Op.or] : [
                        {
                            date : task.date,
                            [Op.or] : [
                            {[Op.and]:[{start : {[Op.lte] : task.start}},{end : {[Op.gte] : task.start}}]},
                            {[Op.and] : [{start : {[Op.lte] : task.end}},{end : {[Op.gte] : task.end}}]},
                            {[Op.and] : [{start : {[Op.gte] : task.start}},{end : {[Op.lte] : task.end}}]}  ]
                        },
                        {
                            date_end: task.date_end,
                            [Op.or] : [
                            {[Op.and]:[{start : {[Op.lte] : task.start}},{end : {[Op.gte] : task.start}}]},
                            {[Op.and] : [{start : {[Op.lte] : task.end}},{end : {[Op.gte] : task.end}}]},
                            {[Op.and] : [{start : {[Op.gte] : task.start}},{end : {[Op.lte] : task.end}}]}  ]
                        }
                    ]     
                }
            }).then(async (exist) =>{
                if(exist || existFT){
                    console.log('EXIST---------->',exist);
                    messageErr = "Vous avez déjà un événement à cette date.";
                    console.log(messageErr);
                }
                else{
                    console.log("TU PEUX PRENDRE RDV");
                    await Task.create({
                        date : task.date,
                        date_end : task.date_end,
                        start : task.start,
                        end : task.end,
                        important : false,
                        name : "Rendez-vous avec "+ req.session.userName,
                        adress : "",
                        idUser : parseInt(userId, 10),
                    })
                    await Task.create({
                        date : task.date,
                        date_end : task.date_end,
                        start : task.start,
                        end : task.end,
                        important : false,
                        name : "Rendez-vous avec "+userName,
                        adress : "",
                        idUser : req.session.userId,
                    })
                    Freetime.destroy({where : {id : req.body.id}});
                    messageSucc = "Vous venez de prendre un rendez-vous avec " + userName;
                    console.log("rendez vous taken");
                } 
            })
        });
        console.log('ICIIIIIIIIIIIIIII',messageErr, messageSucc)
        res.send({messageErr : messageErr, messageSucc : messageSucc});
    }
}
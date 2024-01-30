const { Task,User } = require('../models')
const moment = require("moment");
const nodemailer = require("nodemailer");
decodeStr = (str) =>{
    return str.replace("&#x27;", "'");
}
mailer = async (req,res,data) => {
    //let destination = await User.findOne({where : {id : req.session.userId},raw : true});
    if(data.length>0){
        console.log("on va envoyer un email");
        const sender = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'projetl2t1@gmail.com',
                pass: 'pkzdizyfskppyigj'
            },
            encode: false
            });
            data.forEach(element => {
                let mailOptions = {
                    from: 'projetl2t1@gmail.com',
                    to: req.session.user,
                    subject: 'UP AGENDA | Votre rendez-vous s\'approche !',
                    text: 'Vous avez un rendez-vous demain '+ moment(element.date).locale('fr').add(1,"days").format('LL')+' à '+element.start + '\n' + 'Details : \n' + decodeStr(element.description),
                };
                sender.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('E-mail envoyé : ' + info.response);
                    }
                });
                Task.update({emailsent : true},{where : {id : element.id}});
            });
    }
    else{
        console.log("PAS DE RAPPEL");
    }
    console.log("dans la recherche ",data);
}
exports.sendEmail = (req,res) =>{
    Task.findAll({
        attributes : ['id', 'description','start','date'],
        where : {
            idUser : req.session.userId,
            emailsent : false,
            important : true,
            date :new Date(moment().tz('Europe/Paris').add(1, 'days').format("YYYY-MM-DD 00:00:00 Z")),
        },
        raw : true,
    }).then(data => {
        console.log(data)
        mailer(req,res,data);
    });
}
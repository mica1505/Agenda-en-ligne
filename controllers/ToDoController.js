const { Todo } = require('../models');
const {body,validationResult } = require("express-validator");
exports.addToDo = [
    body("input_toDo").trim(),
    async (req, res) => {
        console.log('BODY :',req.body);
        if(req.body.del){
            console.log("on sup l'item");
            await Todo.destroy({where: {id : req.body.id}});
            res.redirect('/todo');
        }
        else{
            if(req.body.input_toDo){
                if(req.body.input_toDo !='' ){
                    await Todo.create({
                        idUser : req.session.userId,
                        description : req.body.input_toDo,
                    })
                }
                else{
                    console.log('chaine vide');
                }
            }
            else if(req.body.val){
                await Todo.create({
                    idUser : req.session.userId,
                    description : req.body.val,
                })
            }
            else{
                console.log('-----------------Dans les else-----------------');
                console.log("-----------------------------DANS LA FONCTION DE CHANGEMENT DE TODO ITEM----------------------------------------");
                const todoUpdate = await Todo.update(
                    {description : req.body.newVal},
                    {where : { id : req.body.id }},
                )
                console.log("RECHERCHE TODO DANS LA BDD",todoUpdate);
                console.log("apres update ------------------> ",todoUpdate[0])
            }
            res.redirect('/todo');
        }
    }
]
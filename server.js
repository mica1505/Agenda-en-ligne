const express = require('express');
const app = express();
const path= require("path");
const session = require("express-session");
const flash = require('express-flash');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      //maxAge: 60000*60
    } 
  }))
app.use(flash());
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,"static")))
app.use(express.static(path.join(__dirname,"views")))
const freeTimeRouter = require("./routes/freeTime");
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const todoRouter = require('./routes/todo')
const modifTacheRouter = require("./routes/update_task");
const pageRouter = require('./routes/page');
app.use('/', pageRouter);
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/modificationTache',modifTacheRouter);
app.use('/api/freeTime', freeTimeRouter);
app.use('/api/todo', todoRouter);
const pgDB = require('./models');
pgDB.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
app.listen(3000)

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task",{
        id : {
            type : DataTypes.INTEGER,
            unique : true,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        date:{
            type : DataTypes.DATE,
            allowNull : false
        },
        date_end:{
            type : DataTypes.DATE,
        },
        start : {
            type: DataTypes.TIME,
            allowNull:false
        },
        end:{
            type: DataTypes.TIME,
            allowNull:true
        },
        adress:{
            type: DataTypes.STRING,
            allowNull:true
        },
        important:{
            type: DataTypes.BOOLEAN,
            allowNull:true
        },
        description:{
            type: DataTypes.STRING,
            allowNull:true
        },
        emailsent:{
            type : DataTypes.BOOLEAN,
        },
    })
    Task.associate = (models) => {
        Task.belongsTo(models.User, {
            foreignKey: 'idUser',
        })
    }
    return Task;
}
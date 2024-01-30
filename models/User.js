module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User",{ 
        id: {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            unique : true,
            primaryKey : true
        },
        email : {
            type : DataTypes.STRING,
            unique : true
        },
        password :{
            type : DataTypes.STRING,
            allowNull : false
        },
        user_name  :{
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
        },
        first_name :{
            type : DataTypes.STRING,
            allowNull : false
        },
        last_name :{
            type : DataTypes.STRING,
            allowNull : false
        },
        date_birth  :{
            type : DataTypes.DATE,
            allowNull : true
        }
    })
    User.associate = (models) => {
        User.hasMany(models.Task, { foreignKey: 'idUser' })
        User.hasMany(models.Freetime, { foreignKey: 'idUser' })
        User.hasMany(models.Todo, { foreignKey: 'idUser' })
    }
    return User;
}
module.exports = (sequelize, DataTypes) => {
    const TodoList = sequelize.define("Todo",{ 
        id : {
            type : DataTypes.INTEGER,
            unique : true,
            primaryKey : true,
            autoIncrement : true
        },
        description:{
            type: DataTypes.STRING,
            allowNull:false
        },
    })
    TodoList.associate = (models) => {
        TodoList.belongsTo(models.User, { foreignKey: 'idUser' })
    }
    return TodoList;
}
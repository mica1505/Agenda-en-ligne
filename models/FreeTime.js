module.exports = (sequelize, DataTypes) => {
    const FreeTime = sequelize.define("Freetime",{
        id: {
            type : DataTypes.INTEGER,
            unique : true,
            primaryKey : true,
            autoIncrement : true
        },
        date:{
            type : DataTypes.DATE,
            allowNull : false,
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
    })
    FreeTime.associate = (models) => {
        FreeTime.belongsTo(models.User, {
            foreignKey: 'idUser',
        })
    }
    return FreeTime;
}
const { Model, DataTypes}= require("sequelize");
const sequelize= require("../config/connection");

class Platform extends Model{}

Platform.init(
    {
        p_tag:{
            type: DataTypes.STRING,
            allowNull:false
        }
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName: true,
        modelName: "platform"
    }
);

module.exports= Platform;
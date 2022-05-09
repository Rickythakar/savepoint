const { Model, DataTypes}= require("sequelize");
const sequelize= require("../config/connection");

class Genre extends Model{}

Genre.init(
    {
        g_tag:{
            type: DataTypes.STRING,
            allowNull:false
        }
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName: true,
        modelName: "genre"
    }
);

module.exports= Genre;
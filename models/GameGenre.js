const { Model, DataTypes}= require("sequelize");
const sequelize= require("../config/connection");

class GameGenre extends Model{}

GameGenre.init(
    {
        game_g_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"game",
                key:"id"
            }
        },
        genre_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"genre",
                key:"id"
            }
        },
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName: true,
        modelName: "gamegenre"
    }
);

module.exports= GameGenre;
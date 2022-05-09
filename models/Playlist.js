const { Model, DataTypes}= require("sequelize");
const sequelize= require("../config/connection");

class Playlist extends Model{}

Playlist.init(
    {
        user_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"user",
                key:"id"
            }
        },
        game_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"game",
                key:"id"
            }
        },
        played: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName: true,
        modelName: "playlist"
    }
);

module.exports= Playlist;
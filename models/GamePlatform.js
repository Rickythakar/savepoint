const { Model, DataTypes}= require("sequelize");
const sequelize= require("../config/connection");

class GamePlatform extends Model{}

GamePlatform.init(
    {
        game_p_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"game",
                key:"id"
            }
        },
        plat_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"platform",
                key:"id"
            }
        },
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName: true,
        modelName: "gameplatform"
    }
);

module.exports= GamePlatform;
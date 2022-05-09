const { Model, DataTypes}= require("sequelize");
const sequelize= require("../config/connection");

class Review extends Model{}

Review.init(
    {
        rating:{
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                min:0,
                max:5
            }
        },
        content:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        game_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "game",
                key: "id" 
            }
        },
        author_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "user",
                key: "id" 
            }
        },
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName: true,
        modelName: "review"
    }
);

module.exports= Review;
const Game= require("./Game");
const Platform= require("./Platform");
const Genre= require("./Genre");
const GameGenre= require("./GameGenre");
const GamePlatform= require("./GamePlatform");
const Playlist= require("./Playlist");
const User= require("./User");
const Review= require("./Review");

Game.belongsToMany(Genre,{
    through: GameGenre,
    foreignKey: "game_g_id"
});

Game.belongsToMany(Platform,{
    through: GamePlatform,
    foreignKey: "game_p_id"
});

Platform.belongsToMany(Game,{
    through: GamePlatform,
    foreignKey: "plat_id"
});

Genre.belongsToMany(Game,{
    through: GameGenre,
    foreignKey: "genre_id"
});

Review.belongsTo(User,{
    foreignKey: "author_id"
});

Review.belongsTo(Game,{
    foreignKey: "game_id"
});

User.hasMany(Review,{
    foreignKey: "author_id",
    onDelete: "CASCADE"
});

Game.hasMany(Review,{
    foreignKey: "game_id",
    onDelete: "CASCADE"
})

module.exports= {
    Game,
    Genre,
    Platform,
    GameGenre,
    GamePlatform
}
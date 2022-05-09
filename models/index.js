const Game= require("./Game");
const Platform= require("./Platform");
const Genre= require("./Genre");
const GameGenre= require("./GameGenre");
const GamePlatform= require("./GamePlatform");
const User = require("./User");
const Playlist = require("./Playlist");

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

User.belongsToMany(Game, {
    through: Playlist,
    foreignKey: "user_id"
});

Game.belongsToMany(User, {
    through: Playlist,
    foreignKey: "game_id"
});

module.exports= {
    Game,
    Genre,
    Platform,
    GameGenre,
    GamePlatform
}
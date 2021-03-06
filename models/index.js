const Game= require("./Game");
const Platform= require("./Platform");
const Genre= require("./Genre");
const GameGenre= require("./GameGenre");
const GamePlatform= require("./GamePlatform");
const User= require("./User");
const Review= require("./Review");
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
    GamePlatform,
    User,
    Review,
    Playlist
}
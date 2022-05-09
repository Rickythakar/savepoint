const seedGenres= require("./genSeeds");
const seedPlatforms= require("./platSeeds");
const seedGames= require("./gameSeeds");

const sequelize= require("../config/connection");

const seedAll= async () =>{
    await sequelize.sync({force:true});
    await seedGenres();

    await seedPlatforms();

    await seedGames();
    

    process.exit(0);
}

seedAll();
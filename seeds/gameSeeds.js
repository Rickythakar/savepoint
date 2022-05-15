const axios= require("axios");
const {GameGenre, GamePlatform, Game}= require("../models");
const dbPlatforms= [
    "PC (Microsoft Windows)","Mac","PlayStation 2","Dreamcast","Nintendo Switch","Xbox","Nintendo 64","Wii U","Super Nintendo Entertainment System (SNES)","PlayStation 3","PlayStation 4","Nintendo GameCube","Wii","PlayStation 5","Xbox Series X|S","Xbox 360","Xbox One","PlayStation",
];
const dbGenres=[
    "Virtual Reality","First person","Third person","Bird view / Isometric", "Text", "Auditory", "Side view", "Fighting", "Shooter", "Music", "Platform" ,"Puzzle","Racing","Real Time Strategy (RTS)","Role-playing (RPG)","Simulator","Sport","Strategy","Turn-based strategy (TBS)","Tactical","Quiz/Trivia","Hack and slash/Beat 'em up","Pinball","Adventure","Arcade","Visual Novel","Indie","Card & Board Game","MOBA","Point-and-click",
]

const duplicateFilter= async (gameName, index, arr) =>{
    return await arr.filter((game)=>{
        if(game.title.toLowerCase()!=gameName || arr.indexOf(game)==index){
            return true;
        } else {
            return false;
        }
    })
}


const init=async ()=>{
    let totGameData=[];
    for(i=0; i<16; i++){
        let offset= i*500;
        let gamesRaw= await grabRaw(offset);
        totGameData= totGameData.concat(gamesRaw);
    }
   await deconstructRaw(totGameData);

}

const grabRaw= async (offset)=>{
    const data= await axios({
        method: "post",
        url: "https://api.igdb.com/v4/games",
        headers:{
            "Client-ID": "236s12ecjdnerb99bz116ajg178wx1",
            "Authorization": "Bearer 9sgq4fie7v3iaay562o1rorxbb4wfz"
        },
        data: `fields: cover.image_id, first_release_date, genres.name, name, platforms.name,player_perspectives.name, summary, total_rating, involved_companies.company.name, videos.video_id; where: first_release_date!=null & summary!=null & total_rating!=null & player_perspectives!= null & videos!=null & cover!=null &category=0 & platforms.name= ("PC(Microsoft Windows)", "Mac", "Nintendo Switch", "Xbox One", "PlayStation 4", "PlayStation 3", "PlayStation 2", "Playstation", "Dreamcast", "Xbox", "Nintendo 64", "Wii U", "Super Nintendo Entertainment System (SNES)", "Nintendo GameCube", "Wii", "Playstation 5", "Xbox Series X|S", "Xbox 360") & platforms.name!=("Linux", "iOS", "PC DOS", "Android", "Amiga", "Atarti ST/STE", "Apple II", "Apple IIGS", "Sega Mega Drive/Genesis", "PlayStation Portable", "3DO Interactive Multiplayer", "Atari Jaguar", "Sega CD", "Amiga CD32") & genres.name != "Visual Novel" & genres.name != "Point-and-Click"; limit: 500; offset: ${offset}; sort: id asc;`
    }).then(async (res)=>{
        return await res.data;
    });

    return data;
}

const deconstructRaw= async (rawArr)=>{
    let gamesData=[];
    let genreData=[];
    let platData=[];
    for(const game of rawArr){
        let currgame={
            title: game.name,
            cover_art_url: `https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.jpg`,
            trailer_url: `https://www.youtube.com/watch?v=${game.videos[0].video_id}`,
            release_date: game.first_release_date,
            description: game.summary,
            rating: game.total_rating
        };
        gamesData.push(currgame);
        let beforeLen= gamesData.length;
        gamesData= await duplicateFilter(currgame.title.toLowerCase(), gamesData.indexOf(currgame), gamesData);
        if(beforeLen===gamesData.length){
            for(const genre of game.genres){
                let gameIndex= gamesData.indexOf(currgame)+1;
                let genIndex= dbGenres.indexOf(genre.name)+1;
                let genrePair={
                    game_g_id: gameIndex,
                    genre_id: genIndex
                }
                genreData.push(genrePair);
            }
            
            for(const pov of game.player_perspectives){
                let gameIndex= gamesData.indexOf(currgame)+1;
                let genIndex= dbGenres.indexOf(pov.name)+1;
                let genrePair={
                    game_g_id: gameIndex,
                    genre_id: genIndex
                }
                genreData.push(genrePair);
            }
    
            for(const platform of game.platforms){
                let gameIndex= gamesData.indexOf(currgame)+1;
                let platIndex= dbPlatforms.indexOf(platform.name)+1;
                if(platIndex==0){
                    break;
                }
                let platPair={
                    game_p_id: gameIndex,
                    plat_id: platIndex
                }
                platData.push(platPair);
            }
        }
    }
    await addGames(gamesData);
    await genKeyPairs(genreData);
    await platKeyPairs(platData);
}

const addGames= async (games) =>{
    await Game.bulkCreate(games);
}

const genKeyPairs= async(genrePairs)=>{
    await GameGenre.bulkCreate(genrePairs);
}

const platKeyPairs= async(platformPairs)=>{
    await GamePlatform.bulkCreate(platformPairs);
}


module.exports= init;
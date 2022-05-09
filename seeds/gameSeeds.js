const axios= require("axios");
const {GameGenre, GamePlatform, Game}= require("../models");
const platforms= [
    "PC (Microsoft Windows)","Mac","PlayStation 2","Dreamcast","Nintendo Switch","Xbox","Nintendo 64","Wii U","Super Nintendo Entertainment System (SNES)","PlayStation 3","PlayStation 4","Nintendo GameCube","Wii","PlayStation 5","Xbox Series X|S","Xbox 360","Xbox One","PlayStation",
];
const genres=[
    "Virtual Reality","First person","Third person","Bird view / Isometric", "Text", "Auditory", "Side view", "Fighting","Shooter","Music","Platform","Puzzle","Racing","Real Time Strategy (RTS)","Role-playing (RPG)","Simulator","Sport","Strategy","Turn-based strategy (TBS)","Tactical","Quiz/Trivia","Hack and slash/Beat 'em up","Pinball","Adventure","Arcade","Visual Novel","Indie","Card & Board Game","MOBA","Point-and-click",
]

const init=async ()=>{
    let totGamesRaw=[];
    // for(i=0; i<20; i++){
    //     let gamesRaw= await grabRaw(offset);
    //     totGamesRaw= totGamesRaw.concat(gamesRaw);
    // }
    let gamesRaw= await grabRaw()
   await deconstructRaw(gamesRaw);

}

const grabRaw= async ()=>{
    const data= await axios({
        method: "post",
        url: "https://api.igdb.com/v4/games",
        headers:{
            "Client-ID": "236s12ecjdnerb99bz116ajg178wx1",
            "Authorization": "Bearer 9sgq4fie7v3iaay562o1rorxbb4wfz"
        },
        data: `fields: cover.url, first_release_date, genres.name, name, platforms.name,player_perspectives.name, summary, total_rating, involved_companies.company.name, videos.video_id; where: total_rating!=null & player_perspectives!= null & videos!=null & cover!=null &category=0 & platforms.name= ("PC(Microsoft Windows)", "Mac", "Nintendo Switch", "Xbox One", "PlayStation 4", "PlayStation 3", "PlayStation 2", "Playstation", "Dreamcast", "Xbox", "Nintendo 64", "Wii U", "Super Nintendo Entertainment System (SNES)", "Nintendo GameCube", "Wii", "Playstation 5", "Xbox Series X|S", "Xbox 360") & genres.name != "Visual Novel" & genres.name != "Point-and-Click" & genres.name != "Indie"; limit: 500; sort: total_rating desc;`
    }).then(async (res)=>{
        return await res.data;
    });

    return data;
}

const deconstructRaw= async (rawArr)=>{
    let index=0;
    for(const game of rawArr){
        let currgame={
            title: game.name,
            cover_art_url: game.cover.url,
            trailer_url: `https://www.youtube.com/watch?v=${game.videos[0].video_id}`,
            release_date: game.first_release_date,
            description: game.summary,
            rating: game.total_rating
        };
        let genArr= game.genres;
        let platArr= game.platforms;
        let povArr= game.player_perspectives;
        await addGame(currgame);
        await genKeyPair(index+1, genArr, povArr);
        await platKeyPair(index+1, platArr);
        index ++;
    }
}

const addGame= async (game) =>{
    console.log(game);
    await Game.create(game);
}

const genKeyPair= async(gameID, genreArr, camArr)=>{
    for(const genre of genreArr){
        let genIndex= genres.indexOf(genre.name)+1;
        await GameGenre.create({
            game_g_id: gameID,
            genre_id: genIndex
        });
    }

    for(const pov of camArr){
        let genIndex= genres.indexOf(pov.name)+1;
        await GameGenre.create({
            game_g_id: gameID,
            genre_id: genIndex
    });
    }
}

const platKeyPair= async(gameID, platArr)=>{
    for(const platform of platArr){
        let platIndex= platforms.indexOf(platform.name)+1;
        if(platforms.includes(platform.name)){
            await GamePlatform.create({
                game_p_id: gameID,
                plat_id: platIndex
        });
        }
    }
}


module.exports= init;
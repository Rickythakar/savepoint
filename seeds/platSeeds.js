const axios= require("axios");
const Platform= require("../models/Platform");

const seedPlatforms= async () =>{
    const consoles= await axios({
        method: "post",
        url: "https://api.igdb.com/v4/platforms",
        headers:{
            "Client-ID": "236s12ecjdnerb99bz116ajg178wx1",
            "Authorization": "Bearer 9sgq4fie7v3iaay562o1rorxbb4wfz"
        },
        data: `fields: name; limit: 500; where: generation!=null & category= 1 & name!= "Ouya" & name!= "Zeebo" & name!= "Playdia" & name!= "PC-FX" & name!= "Amiga CD32" & name!= "Virtual Boy" & name!= "Atari Jaguar" & name!= "3DO Interactive Multiplayer" & name!= "Sega Pico" & name!= "Sega Saturn" & name!= "Satellaview" & name!= "Nintendo PlayStation" & name!= "Neo Geo CD" & name!= "PC Engine SuperGrafx" & name!= "TurboGrafx-16/PC Engine" & name!= "Neo Geo AES" & name!= "Sega CD"  & name!= "Sega 32X" & name!= "Super Famicom" & name!= "Sega Mega Drive/Genesis" & generation>3;`
    }).then((res)=>{
        return res.data;
    });

    const allPlats=[
        {
            p_tag: "PC (Microsoft Windows)"
        },
        {
            p_tag: "Mac"
        },
    ];

    for(const console of consoles){
        allPlats.push({
            p_tag: console.name
        })
    }

    await Platform.bulkCreate(allPlats);
    console.log("\n Platforms seeded.")
}

module.exports= seedPlatforms;

const axios= require("axios");
const Genre= require("../models/Genre");

const seedGenres= async () =>{
    const genres= await axios({
        method: "post",
        url: "https://api.igdb.com/v4/genres",
        headers:{
            "Client-ID": "236s12ecjdnerb99bz116ajg178wx1",
            "Authorization": "Bearer 9sgq4fie7v3iaay562o1rorxbb4wfz"
        },
        data: "fields: name; limit: 100;"
    }).then((res)=>{
        return res.data;
    });

    const allGenres=[
        {
            g_tag: "Virtual Reality"
        },
        {
            g_tag: "First person"
        },
        {
            g_tag: "Third person"
        },
        {
            g_tag: "Bird view / Isometric"
        },
        {
            g_tag: "Text"
        },
        {
            g_tag: "Auditory"
        },
        {
            g_tag: "Side view"
        },
    ];

    for(const genre of genres){
        allGenres.push({
            g_tag: genre.name
        })
    }

    await Genre.bulkCreate(allGenres);
    console.log("\n Genres Seeded.")
}

module.exports= seedGenres;
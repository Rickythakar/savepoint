const general= document.querySelector("main");

const addRevHandler= (event, id) =>{
    const gId= event.target.dataset.id;
    const response= axios.post(`/api/reviews/${id}/add`, {
            gameId: gId
    });
    if(response) alert("Game successfully added.");
}

const addPlayHandler= (id) =>{
    const response= axios.post(`/api/playlist/${id}/add`);
    if(response) alert("Game successfully added.");
}

const deleteRevHandler= (event, id) =>{
    const response= axios.post(`/api/reviews/${id}/delete`, {

    });
}

general.addEventListener("click", (event) =>{
    if(event.target.id==="addPBtn"){
        addPlayHandler(event.target.dataset.id);
    }
})
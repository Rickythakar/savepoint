const general= document.querySelector("main");
const deleteBtn="";

const updateHandler= async (event,id) =>{
    event.preventDefault()
    const response= await axios.put(`/api/playlist/${id}`);
    if(response) window.location.reload(true);
}

const deleteHandler= async (event,id) =>{
    event.preventDefault()
    const response= await axios.delete(`/api/playlist/${id}/delete`);
    response ? window.location.reload(true)
    : console.log(response.status)
}

general.addEventListener('click',(event)=>{
    if(event.target.id=="completeToggle"){
        updateHandler(event, event.target.dataset.id);
    }
    if(event.target.id=="deleteBtn"){
        deleteHandler(event, event.target.dataset.id);
    }
});
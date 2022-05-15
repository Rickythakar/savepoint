const general= document.querySelector("main");
const deleteBtn="";

const updateHandler= async (event,id) =>{
    event.preventDefault()
    const response= await axios.put(`/api/playlist/${id}`);
    if(response) window.location.reload(true);
}

const deleteHandler= async (event,id) =>{
    event.preventDefault()
    const response= await axios.put(`/api/playlist/${id}/delete`);
    if(response) window.location.reload(true);
}

general.addEventListener('click',(event)=>{
    if(event.target.id=="completeToggle"){
        updateHandler(event, event.target.dataset.id);
    }
});
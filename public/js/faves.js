const toggleBtn= document.querySelector("#completeToggle");
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

toggleBtn.addEventListener('click',(event)=>{
    updateHandler(event, event.target.dataset.id);
});
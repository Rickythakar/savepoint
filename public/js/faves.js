const { default: axios } = require("axios");

const havePlayedBtn= "";
const deleteBtn="";

const updateHandler= (event,id) =>{
    const response= await axios.put(`/api/playlist/${id}`,{

    });
}

const deleteHandler= (event,id) =>{
    const response= await axios.put(`/api/playlist/${id}/delete`,{

    });
}
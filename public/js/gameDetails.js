const addReviewBtn= "";
const addPlaylistBtn="";
const delReviewBtn="";

const addRevHandler= (event, id) =>{
    const response= axios.post(`/api/reviews/${id}/add`, {

    });
}

const addPlayHandler= (event, id) =>{
    const response= axios.post(`/api/playlist/${id}/add`, {

    });
}

const deleteHandler= (event, id) =>{
    const response= axios.post(`/api/reviews/${id}/delete`, {

    });
}
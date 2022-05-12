const sBar= document.querySelector("#searchBar");
const sBtn= document.querySelector("#searchSubmit");

const searchHandler= async (event) =>{
    event.preventDefault();
    let response;
    if(sBar.value.trim()){
        response= await axios.get(`/api/games/${sBar.value.trim()}`)
    } else {
    response = await axios.get('/api/games');
    }

    if(response){
        console.log("fetching games..")
    } else {
        alert(response.statusText);
    }
};

sBtn.addEventListener('click', searchHandler);

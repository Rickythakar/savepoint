const sBar= document.querySelector("#searchBar");
const sBtn= document.querySelector("#searchSubmit");

const searchHandler= async (event) =>{
    event.preventDefault();
    if(sBar.value.trim()){
        window.location.replace(`/api/games/${sBar.value.trim()}`);
    } else {
        window.location.replace("/api/games");
    }

};

sBtn.addEventListener('click', searchHandler);

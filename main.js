const API = "https://api.thedogapi.com/v1/images/search?limit=2&api_key=b612b58d-d697-4d4c-aa50-1022152aacc5"
const API_FAVORITES = "https://api.thedogapi.com/v1/favourites?limit=2"

const img0 = document.querySelector("#img0");
const img1 = document.querySelector("#img1");
const button = document.getElementById("btn");
const spanError = document.getElementById("error")


// Sintaxis de Async await
async function fetcher() {
    const res = await fetch(API);
    const dog = await res.json();
    
    if (res.status !== 200) {
        spanError.innerHTML = "<h3>Hubo un error: </h3>" + res.status
    } else {
        console.log(res.status)
        img0.src = dog[0].url;
        img1.src = dog[1].url;
    }
    
}
async function loadFavorites() {
    try {
        const res = await fetch(API_FAVORITES);
        const dog = await res.json();
        console.log(res.status)
        
    } catch {
        spanError.innerHTML = "<h3>Hubo un error: </h3>" + res.status;
    }
}

fetcher();
loadFavorites();
button.onClick = fetcher;


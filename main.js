const API = "https://api.thedogapi.com/v1/images/search?limit=2&api_key=b612b58d-d697-4d4c-aa50-1022152aacc5"
const API_FAVORITES = "https://api.thedogapi.com/v1/favourites?api_key=b612b58d-d697-4d4c-aa50-1022152aacc5"

const img0 = document.querySelector("#img0");
const img1 = document.querySelector("#img1");
const button = document.getElementById("btn");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const spanError = document.getElementById("error")

// Sintaxis de Async await
async function loadRandom() {
    const res = await fetch(API);
    const dog = await res.json();
    console.log(dog)
    
    if (res.status !== 200) {
        spanError.innerHTML = "<h3>Hubo un error: </h3>" + res.status
    } else {
        img0.src = dog[0].url;
        img1.src = dog[1].url;

        btn1.onclick = () => saveFavorite(dog[0].id);
        btn2.onclick = () => saveFavorite(dog[1].id);
    }
}
async function loadFavorites() {
    const res = await fetch(API_FAVORITES);
    const dog = await res.json();
    console.log("Favorites:")
    console.log(dog)
    
    if (res.status !== 200) {
        spanError.innerHTML = "<h3>Hubo un error: </h3>" + res.status + dog.message;
    } else {
        const toRender = [];
        const section = document.querySelector("#favoritesDoggies");

        dog.forEach((elem) => {
            const art = document.createElement("article");
            const img = document.createElement("img");
            const btn = document.createElement("button");
            const textBtn = document.createTextNode("Unfav")

            btn.append(textBtn);
            img.src = elem.image.url

            art.append(img, btn);
            toRender.push(art);
        });

        section.append(...toRender);
    }
}
async function saveFavorite(id) {
    const res = await fetch(API_FAVORITES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            image_id: id,
        }),
    });
    const dog = await res.json()

    console.log("Save", res)
    if (res.status !== 200) {
        spanError.innerHTML = "<h3>Hubo un error: </h3>" + res.status + dog.message;
    }
}

loadRandom();
loadFavorites();
button.onClick = loadFavorites;


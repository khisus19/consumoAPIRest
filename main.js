const api = axios.create({
    baseURL: 'https://api.thedogapi.com/v1'
});
api.defaults.headers.common['x-api-key'] = "b612b58d-d697-4d4c-aa50-1022152aacc5";

const API = "https://api.thedogapi.com/v1/images/search?limit=2"
const API_FAVORITES = "https://api.thedogapi.com/v1/favourites"
const API_FAVORITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=b612b58d-d697-4d4c-aa50-1022152aacc5`
const API_UPLOAD = "https://api.thedogapi.com/v1/images/upload"

const img0 = document.querySelector("#img0");
const img1 = document.querySelector("#img1");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const spanError = document.getElementById("error")

// Sintaxis de Async await
async function loadRandom() {
    const res = await fetch(API);
    const dog = await res.json();
    
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
    const res = await fetch(API_FAVORITES, {
        method: "GET",
        headers: {
            "x-api-key": "b612b58d-d697-4d4c-aa50-1022152aacc5"
        }
    });
    const dog = await res.json();
    console.log("Favorites:", dog.length);
    
    if (res.status !== 200) {
        spanError.innerHTML = "<h3>Hubo un error: </h3>" + res.status + dog.message;
    } else {
        const section = document.querySelector("#favoritesDoggies");
        section.innerHTML = "";
        const h2 = document.createElement("h2");
        const h2Text = document.createTextNode("Favorites doggies");
        h2.appendChild(h2Text);
        const toRender = [];

        dog.forEach((elem) => {
            const art = document.createElement("article");
            const img = document.createElement("img");
            const btn = document.createElement("button");
            const textBtn = document.createTextNode("Unfav");
            
            btn.append(textBtn);
            btn.onclick = () => deleteFavorite(elem.id);
            img.src = elem.image.url

            art.append(img, btn);
            toRender.push(art);
        });

        section.append(...toRender);
    }
}
async function saveFavorite(id) {
    const {data, status} = await api.post("/favourites", {
        image_id: id,
    });

    // const res = await fetch(API_FAVORITES, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "x-api-key": "b612b58d-d697-4d4c-aa50-1022152aacc5"
    //     },
    //     body: JSON.stringify({
    //         image_id: id,
    //     }),
    // });
    // const dog = await res.json()

    if (status !== 200) {
        spanError.innerHTML = "<h3>Hubo un error: </h3>" + status;
    } else {
        console.log("Doggie saved")
        loadFavorites();
    }
}

async function deleteFavorite(id) {
    const res = await fetch(API_FAVORITES_DELETE(id), {
        method: "DELETE",
        headers: {
            "x-api-key": "b612b58d-d697-4d4c-aa50-1022152aacc5"
        }
    });
    const dog = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "<h3>Hubo un error: </h3>" + res.status + dog.message;
    } else {
        console.log("Doggie deleted");
        loadFavorites();
    }
}

async function uploadDoggyPhoto() {
    const form = document.getElementById("uploadingForm");
    const formData = new FormData(form);

    console.log(formData.get("file"))

    const res = await fetch(API_UPLOAD, {
        method: "POST",
        headers: {
            "x-api-key": "b612b58d-d697-4d4c-aa50-1022152aacc5"
        },
        body: formData,
    })
    const dog = await res.json();

    if (res.status !== 201) {
        spanError.innerHTML = "<h3>Hubo un error: </h3>" + res.status + dog.message;
        console.log(dog.message)
        console.log({dog})
    } else {
        console.log("Uploaded");
        console.log({dog});
        console.log(dog.url);
        saveFavorite(dog.id);
    }
}

loadRandom();
loadFavorites();


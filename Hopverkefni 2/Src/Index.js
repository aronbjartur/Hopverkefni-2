const openShopping = document.querySelector(".shopping");
const closeShopping = document .querySelector(".closeShopping");
const list = document .querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document .querySelector("body");
const quantity = document.querySelector(".quantity");




openShopping.addEventListener("click", () => {
	body.classlList.add("active")

})

closeShopping.addEventListener("click", () => {
	body.classlList.remove("active")

})


let products = [
    {
        id: '1',
        title: 'Toyota Yaris',
        image: 'Yaris.png',
        price: '1.500.00 kr.',
        category: 'bíll',
        description: 'glænýr Toyota Yaris 2023 árgerð.'
    },
    {
        id: '2',
        title: 'Pulsa',
        image: 'hotdog.png',
        price: '550 kr',
        category: 'matur',
        description: 'pulsa með steiktum lauk, tómatsósu og sinnep.'
    }
];

let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src ="img/${value.images}">
            <div class ="title">${value.name}</div>
            <div class ="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCArd(${key})"Add To Card</button>

            `
        list.appendChild(newDiv)

    })
}


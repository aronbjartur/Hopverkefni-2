let listProductHTML = document.querySelector(".listProduct"),
    listCartHTML = document.querySelector(".listCart"),
    iconCart = document.querySelector(".icon-cart"),
    iconCartSpan = document.querySelector(".icon-cart span"),
    body = document.querySelector("body"),
    closeCart = document.querySelector(".close"),
    total = document.querySelector(".total"),
    products = [],
    cart = [];

iconCart.addEventListener("click", () => {
    body.classList.toggle("showCart")
});
closeCart.addEventListener("click", () => {
    body.classList.toggle("showCart")
});

const addDataToHTML = () => {
    products.items.length > 0 && products.items.forEach(t => {
        let a = document.createElement("div");
        a.dataset.id = t.id;
        a.classList.add("item");
        a.innerHTML = `<a href="Sites/vorusida.html?id=${t.id}">
                    <img src="${t.image}" alt="">
                    <h2 class="product-name">${t.title}</h2>
                </a>
                
                <h4>${t.category_title}</h4>
                <div class="price">${t.price}kr</div>
                <button class="addCart">Add To Cart</button>`;
        listProductHTML.appendChild(a)
    })
};

listProductHTML.addEventListener("click", t => {
    let a = t.target;
    a.classList.contains("addCart") ? addToCart(a.parentElement.dataset.id) : "IMG" === a.tagName && navigateToProductPage(a.parentElement.dataset.id)
});

const addToCart = t => {
    let a = cart.findIndex(a => a.product_id == t);
    cart.length <= 0 ? cart = [{
        product_id: t,
        quantity: 1
    }] : a < 0 ? cart.push({
        product_id: t,
        quantity: 1
    }) : cart[a].quantity = cart[a].quantity + 1, addCartToHTML(), addCartToMemory()
},
    addCartToMemory = () => {
        localStorage.setItem("cart", JSON.stringify(cart))
    },
    addCartToHTML = () => {
        listCartHTML.innerHTML = "";
        let t = 0,
            a = 0;
        cart.length > 0 && cart.forEach(e => {
            t += e.quantity;
            let i = document.createElement("div");
            i.classList.add("item");
            i.dataset.id = e.product_id;
            let r = products.items[products.items.findIndex(t => t.id == e.product_id)];
            listCartHTML.appendChild(i);
            i.innerHTML = `
            <div class="image">
                    <img src="${r.image}">
                </div>
                <div class="name">
                ${r.title}
                </div>
                <div class="totalPrice">${r.price * e.quantity} kr</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${e.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
            a += r.price * e.quantity
        }), iconCartSpan.innerText = t, total.innerText = a.toLocaleString()
    };

listCartHTML.addEventListener("click", t => {
    let a = t.target;
    if (a.classList.contains("minus") || a.classList.contains("plus")) {
        let e = a.parentElement.parentElement.dataset.id,
            i = "minus";
        a.classList.contains("plus") && (i = "plus"), changeQuantityCart(e, i)
    }
});

const changeQuantityCart = (t, a) => {
    let e = cart.findIndex(a => a.product_id == t);
    if (e >= 0) {
        if (cart[e], "plus" === a) cart[e].quantity = cart[e].quantity + 1;
        else {
            let i = cart[e].quantity - 1;
            i > 0 ? cart[e].quantity = i : cart.splice(e, 1)
        }
        addCartToHTML(), addCartToMemory()
    }
},
    navigateToProductPage = t => {
        window.location.href = `vorusida.html?id=${t}`
    };

let isAppInitialized = !1;

const initApp = () => {
    if (!isAppInitialized) {
        fetch("https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?limit=6")
            .then(t => t.json())
            .then(t => {
                products = t;
                addDataToHTML();
                if (localStorage.getItem("cart")) {
                    cart = JSON.parse(localStorage.getItem("cart"));
                    addCartToHTML();
                }
            });
        isAppInitialized = !0;
    }
};

document.querySelector('.listProduct').style.gridTemplateColumns = 'repeat(2, 1fr)';

initApp();

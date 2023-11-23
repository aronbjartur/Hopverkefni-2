let listProductHTML=document.querySelector(".listProduct"),
    listCartHTML=document.querySelector(".listCart"),
    iconCart=document.querySelector(".icon-cart"),
    iconCartSpan=document.querySelector(".icon-cart span"),
    body=document.querySelector("body"),
    closeCart=document.querySelector(".close"),
    total=document.querySelector(".total"),
    products=[],
    cart=[];

iconCart.addEventListener("click",()=>{body.classList.toggle("showCart")});
closeCart.addEventListener("click",()=>{body.classList.toggle("showCart")});

// Fetch categories from API
fetch('https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/categories')
    .then(response => response.json())
    .then(data => {
        const buttonsDiv = document.getElementById('buttons');

        // Create a button for each category
        data.items.forEach(category => {
            const button = document.createElement('button');
            button.className = 'button-value';
            button.innerText = category.title;
            button.onclick = () => filterProduct(category.title);
            buttonsDiv.appendChild(button);
        });
        // Add 'Allt' button
        const allButton = document.createElement('button');
        allButton.className = 'button-value';
        allButton.innerText = 'Allt';
        allButton.onclick = () => filterProduct('allt');
        buttonsDiv.appendChild(allButton);
    });

const addDataToHTML=()=>{
    products.length>0&&products.forEach(t=>{
        let a=document.createElement("div");
        a.dataset.id=t.id;
        a.classList.add("item");
        a.classList.add(t.category_title);
        a.innerHTML=`<a href="vorusida.html?id=${t.id}">
                    <img src="${t.image}" alt="">
                    <h2 class="Vorunafn">${t.title}</h2>
                </a>
                <h4>${t.category_title}</h4>
                <div class="price">${t.price}kr</div>
                <button class="addCart">Add To Cart</button>`;
        listProductHTML.appendChild(a)
    })
};

listProductHTML.addEventListener("click",t=>{
    let a=t.target;
    a.classList.contains("addCart")&&addToCart(a.parentElement.dataset.id)
});

const addToCart=t=>{
    let a=cart.findIndex(a=>a.product_id==t);
    cart.length<=0?cart=[{product_id:t,quantity:1}]:a<0?cart.push({product_id:t,quantity:1}):cart[a].quantity=cart[a].quantity+1;
    addCartToHTML();
    addCartToMemory()
};

addCartToMemory=()=>{localStorage.setItem("cart",JSON.stringify(cart))};

addCartToHTML=()=>{
    listCartHTML.innerHTML="";
    let t=0,a=0;
    cart.length>0&&cart.forEach(e=>{
        t+=e.quantity;
        let r=document.createElement("div");
        r.classList.add("item");
        r.dataset.id=e.product_id;
        let i=products[products.findIndex(t=>t.id==e.product_id)];
        listCartHTML.appendChild(r);
        r.innerHTML=`
            <div class="image">
                    <img src="${i.image}">
                </div>
                <div class="name">
                ${i.title}
                </div>
                <div class="totalPrice">${i.price*e.quantity} kr</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${e.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        a+=i.price*e.quantity
    });
    iconCartSpan.innerText=t;
    total.innerText=a.toLocaleString()
};

function filterProduct(t){
    document.querySelectorAll(".button-value").forEach(a=>{
        t.toUpperCase()==a.innerText.toUpperCase()?a.classList.add("active"):a.classList.remove("active")
    });
    document.querySelectorAll(".item").forEach(a=>{
        "allt"==t?a.classList.remove("hide"):a.classList.contains(t)?a.classList.remove("hide"):a.classList.add("hide")
    })
}

window.onload=()=>{filterProduct("allt")};

listCartHTML.addEventListener("click",t=>{
    let a=t.target;
    if(a.classList.contains("minus")||a.classList.contains("plus")){
        let e=a.parentElement.parentElement.dataset.id,r="minus";
        a.classList.contains("plus")&&(r="plus");
        changeQuantityCart(e,r)
    }
});

const changeQuantityCart=(t,a)=>{
    let e=cart.findIndex(a=>a.product_id==t);
    if(e>=0){
        if(cart[e],"plus"===a)cart[e].quantity=cart[e].quantity+1;
        else{
            let r=cart[e].quantity-1;
            r>0?cart[e].quantity=r:cart.splice(e,1)
        }
    }
    addCartToHTML();
    addCartToMemory()
};

initApp=()=>{
    fetch("https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products")
    .then(t=>t.json())
    .then(t=>{
        products=t.items;
        addDataToHTML();
        localStorage.getItem("cart")&&(cart=JSON.parse(localStorage.getItem("cart")),addCartToHTML())
    })
};

document.querySelector('.listProduct').style.gridTemplateColumns = 'repeat(4, 1fr)';

initApp();

function getProductIdFromURL(){
    let t=new URLSearchParams(window.location.search);
    return t.get("id")||""
}

function displayProductDetails(t){
    let e=document.getElementById("product-title"),
        r=document.getElementById("product-image"),
        i=document.getElementById("product-price"),
        o=document.getElementById("product-category"),
        d=document.getElementById("product-description");
    e&&(e.innerText=t.title),
    r.classList.add("product-item"),
    r instanceof HTMLImageElement&&(r.src=t.image),
    i&&(i.innerText=`Price: ${t.price} kr`),
    o&&(o.innerText=`Category: ${t.category_title||""}`),
    d&&(d.innerText=t.description)
}

function fetchSimilarProducts(category_id){
    fetch(`https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?limit=3&category=${category_id}`)
    .then(t=>t.json())
    .then(e=>{
        let r=e.items.filter(t=>t.id!==parseInt(getProductIdFromURL()));
        displaySimilarProducts(r)
    })
    .catch(t=>console.error("Error fetching similar products:",t))
}

function displaySimilarProducts(t){
    let e=document.querySelector(".similar-products-container");
    e.innerHTML="",
    t.forEach((t,r)=>{
        let i=document.createElement("div");
        i.classList.add("similar-product-item"),
        i.innerHTML=`
            <img src="${t.image}" alt="Similar Product Image">
            <p>${t.title}</p>
            <p>${t.price} kr</p>
        `,
        e.appendChild(i)
    })
}

document.addEventListener("DOMContentLoaded",()=>{
    let t=getProductIdFromURL();
    fetch("https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products")
    .then(t=>t.json())
    .then(e=>{
        let r=e.items.find(e=>e.id.toString()===t);
        r?(displayProductDetails(r),r.category_id&&fetchSimilarProducts(r.category_id)):console.error("Product not found")
    })
    .catch(t=>console.error("Error fetching product details:",t))
});

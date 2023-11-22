// vorusida.js

document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromURL();
    
    // Fetch details for the selected product
    fetch('../products.json')  // Fetch local products.json file
        .then(response => response.json())
        .then(products => {
            const productData = products.find(product => product.id.toString() === productId);
            
            if (productData) {
                displayProductDetails(productData);

                // Fetch three similar products in the same category
                if (productData.category) {
                    fetchSimilarProducts(productData.category, products);
                }
            } else {
                console.error('Product not found');
            }
        })
        .catch(error => console.error('Error fetching product details:', error));
});


function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || '';
}

function displayProductDetails(product) {
    const titleElement = document.getElementById('product-title');
    const imageElement = document.getElementById('product-image');
    const priceElement = document.getElementById('product-price');
    const categoryElement = document.getElementById('product-category');
    const descriptionElement = document.getElementById('product-description');

    if (titleElement) titleElement.innerText = product.name;
    if (imageElement instanceof HTMLImageElement) imageElement.src = product.image;
    if (priceElement) priceElement.innerText = `Price: ${product.price} kr`;
    if (categoryElement) categoryElement.innerText = `Category: ${product.category || ''}`;
    if (descriptionElement) descriptionElement.innerText = product.description;
}

function fetchSimilarProducts(category, allProducts) {
    // Filter products with the same category
    const similarProducts = allProducts.filter(product => product.category === category);

    // Exclude the current product from the list
    const filteredSimilarProducts = similarProducts.filter(product => product.id !== parseInt(getProductIdFromURL()));

    // Take up to 3 similar products
    const limitedSimilarProducts = filteredSimilarProducts.slice(0, 3);

    // Display the similar products
    displaySimilarProducts(limitedSimilarProducts);
}

document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromURL();

    // Fetch details for the selected product
    fetch('../products.json')  // Fetch local products.json file
        .then(response => response.json())
        .then(products => {
            const productData = products.find(product => product.id.toString() === productId);

            if (productData) {
                displayProductDetails(productData);

                // Fetch and display similar products
                if (productData.category) {
                    fetchSimilarProducts(productData.category, products);
                }
            } else {
                console.error('Product not found');
            }
        })
        .catch(error => console.error('Error fetching product details:', error));
});


function displaySimilarProducts(similarProducts) {
    const similarProductsContainer = document.querySelector('.similar-products-container');

    // Clear previous content
    similarProductsContainer.innerHTML = '';

    // Loop through similar products and update HTML elements
    similarProducts.forEach((product, index) => {
        const similarProductElement = document.createElement('div');
        similarProductElement.classList.add('similar-product-item');

        similarProductElement.innerHTML = `
            <img src="${product.image}" alt="Similar Product Image">
            <p>${product.name}</p>
            <p>${product.price} kr</p>
        `;

        similarProductsContainer.appendChild(similarProductElement);
    });
}



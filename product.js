const products = [
    { id: 1, name: "Nike P-6000", price: 6699.99, stock: 5, image: "1.jpg" },
    { id: 2, name: "Nike Air Max Dn", price: 199.99, stock: 8, image: "2.jpg" },
    { id: 3, name: "Nike Air Max 270", price: 129.99, stock: 12, image: "3.jpg" },
    { id: 4, name: "Nike Air Max 95", price: 89.99, stock: 7, image: "4.jpg" },
    { id: 5, name: "Nike V2K Run", price: 599.99, stock: 3, image: "5.jpg" },
    { id: 6, name: "Nike Zoom Vomer 5", price: 49.99, stock: 15, image: "6.jpg" },
    { id: 7, name: "Nike Pegasus Premium", price: 899.99, stock: 4, image: "7.jpg" },
    { id: 8, name: "Nike C1TY", price: 79.99, stock: 10, image: "8.jpg" }
];

 // display products

 function displayProducts() {
    productsList.innerHTML = '';
    products.forEach(product => {
        const isInCart = cart.some(item => item.id === product.id);
        
        const productEl = document.createElement('div');
        productEl.className = 'product';
        productEl.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-stock">In stock: ${product.stock}</p>
                <button class="add-to-cart" data-id="${product.id}" ${isInCart ? 'disabled' : ''}>
                    ${isInCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
            </div>
        `;
        productsList.appendChild(productEl);
    });

    // cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// const productsPerPage = 8;
// let currentPage = 1;
// const totalPages = Math.ceil(products.length / productsPerPage);
// const maxVisiblePages = 5;

let from = 0;
let to = 8;
let pageNum = 1;
const products = [
    { id: 1, name: "Nike P-6000", price: 6699.99, stock: 5, image: "1.jpg" },
    { id: 2, name: "Nike Air Max Dn", price: 199.99, stock: 8, image: "2.jpg" },
    { id: 3, name: "Nike Air Max 270", price: 129.99, stock: 12, image: "3.jpg" },
    { id: 4, name: "Nike Air Max 95", price: 89.99, stock: 7, image: "4.jpg" },
    { id: 5, name: "Nike V2K Run", price: 599.99, stock: 3, image: "5.jpg" },
    { id: 6, name: "Nike Zoom Vomer 5", price: 49.99, stock: 15, image: "6.jpg" },
    { id: 7, name: "Nike Pegasus Premium", price: 899.99, stock: 4, image: "7.jpg" },
    { id: 8, name: "Nike C1TY", price: 79.99, stock: 10, image: "8.jpg" },

    { id: 9, name: "Nike P-60000", price: 6699.99, stock: 5, image: "9.jpg" },
    { id: 10, name: "Nike Air Max Dn", price: 199.99, stock: 8, image: "10.jpeg" },
    { id: 11, name: "Nike Air Max 270", price: 129.99, stock: 12, image: "11.jpeg" },
    { id: 12, name: "Nike Air Max 95", price: 89.99, stock: 7, image: "12.avif" },
    { id: 13, name: "Nike V2K Run", price: 599.99, stock: 3, image: "13.avif" },
    { id: 14, name: "Nike Zoom Vomer 5", price: 49.99, stock: 15, image: "14.jpg" },
    { id: 15, name: "Nike Pegasus Premium", price: 899.99, stock: 4, image: "15.jpg" },
    { id: 16, name: "Nike C1TY", price: 79.99, stock: 10, image: "16.avif" },
    { id: 17, name: "Nike C1TY", price: 79.99, stock: 10, image: "17.jpg" },
    { id: 1, name: "Nike P-6000", price: 6699.99, stock: 5, image: "1.jpg" },
    { id: 2, name: "Nike Air Max Dn", price: 199.99, stock: 8, image: "2.jpg" },
    { id: 3, name: "Nike Air Max 270", price: 129.99, stock: 12, image: "3.jpg" },
    { id: 4, name: "Nike Air Max 95", price: 89.99, stock: 7, image: "4.jpg" },
    { id: 5, name: "Nike V2K Run", price: 599.99, stock: 3, image: "5.jpg" },
    { id: 6, name: "Nike Zoom Vomer 5", price: 49.99, stock: 15, image: "6.jpg" },
    { id: 7, name: "Nike Pegasus Premium", price: 899.99, stock: 4, image: "7.jpg" },
    { id: 8, name: "Nike C1TY", price: 79.99, stock: 10, image: "8.jpg" },
];



function buttonCount() {
    // console.log("product length " + products.length);
    let pl = Math.ceil(products.length / 8);


    document.addEventListener("DOMContentLoaded", function () {
        const pageNumberDiv = document.getElementById("pageNumber");

        // Clear any existing content
        pageNumberDiv.innerHTML = '';

        // Loop from 1 to products.length
        for (let i = 1; i <= pl; i++) {
            // Create button using template literals like in your example
            pageNumberDiv.className = 'page-number';
            const buttonHTML = `
            <button data-page="${i}">
                ${i}
            </button>
            
        `


            // Add the button HTML to the div
            pageNumberDiv.innerHTML += buttonHTML;
        }

        // Add event listeners to all buttons




        const buttons = pageNumberDiv.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                pageNum = this.getAttribute('data-page');
                console.log(`Page ${pageNum} selected`);
                // Add your page navigation logic here



                from = (pageNum - 1) * 8;
                to = pageNum * 8;

                displayProducts();

            });
        });


    });


}



//  display products

function displayProducts() {
    productsList.innerHTML = '';
    let filter = products.slice(from, to);

    filter.forEach(product => {
        const isInCart = cart.some(item => item.id === product.id);
        const isInWish = wish.some(item => item.id === product.id);

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
                <button class="add-to-wish wish" data-id="${product.id}" ${isInWish ? 'disabled' : ''}>
                    ${isInWish ? 'Wished' : '🤍'}
                </button>
            </div>
        `;
        productsList.appendChild(productEl);
    });

    // Cart event listeners
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // ✅ Paste this block right here:
    document.querySelectorAll('.add-to-wish').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            if (!wish.some(item => item.id === productId)) {
                wish.push(product);
                updateWishCount();
                saveState();
                e.target.disabled = true;
                e.target.textContent = '❤️';
            }
        });
    });
}







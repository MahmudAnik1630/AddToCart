function updateWishDisplay() {
    cartItems.innerHTML = '';

    if (wish.length === 0) {
        cartItems.innerHTML = '<p>Your wishlist is empty.</p>';
        totalAmount.textContent = '$0.00';
        discountInfo.style.display = 'none';
        checkoutBtn.style.display = 'none';
        balanceLeft.parentElement.style.display = 'none';
        return;
    }

    wish.forEach(item => {
        const wishItem = document.createElement('div');
        wishItem.className = 'cart-item ';
        wishItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <button class="add-to-cart-from-wish" data-id="${item.id}">Add to Cart</button>
            <button class="remove-wish-item" data-id="${item.id}">×</button>
        `;
        cartItems.appendChild(wishItem);
    });

    document.querySelectorAll('.remove-wish-item').forEach(button => {
        button.addEventListener('click', removeFromWish);
    });

    document.querySelectorAll('.add-to-cart-from-wish').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = wish.find(p => p.id === productId);
            if (product) {
                wish = wish.filter(item => item.id !== productId);
                addToCart({ target: { getAttribute: () => productId } });
                updateWishCount();
                updateWishDisplay();
                saveState();
            }
        });
    });

    totalAmount.textContent = '';
    discountInfo.style.display = 'none';
    checkoutBtn.style.display = 'none';
    balanceLeft.parentElement.style.display = 'none';
    
}
function removeFromWish(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    wish = wish.filter(item => item.id !== productId);
    updateWishCount();
    updateWishDisplay();
    saveState();
    displayProducts();
}

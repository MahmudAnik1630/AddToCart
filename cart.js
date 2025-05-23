// update cart display
function updateCartDisplay() {
    cartItems.innerHTML = '';

    // hehehehehehheeheh
    //discountInfo.style.display = 'block';
        checkoutBtn.style.display = 'block';
        balanceLeft.parentElement.style.display = 'block';
        couponInput.style.display='block';
        applyCoupon.style.display='block';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        totalAmount.textContent = '$0.00';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">×</button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // remove button
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
    
    const total = calculateTotal();
    totalAmount.textContent = `$${total.toFixed(2)}`;

    // balance left 
    
    let balanceleft = balance - total;
    if (balanceleft > 0) {
        balanceLeft.textContent = balanceleft.toFixed(2);
    }
    
    // check balance
    if (total > balance) {
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'Insufficient Balance';
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = 'Checkout';
    }
}

 // remove item from cart
 function removeFromCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    
    // balance left updated 
    balanceLeft.textContent = balance.toFixed(2);

    
    updateCartCount();
    updateCartDisplay();
    saveState();
    
    // update product button state
    const productBtn = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    if (productBtn) {
        productBtn.disabled = false;
        productBtn.textContent = 'Add to Cart';
    }
}
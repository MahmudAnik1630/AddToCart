
        let cart = [];
        let balance = 5000;
        let couponApplied = false;
        const discountPercent = 10;

        
        const productsList = document.getElementById('productsList');
        //console.log(productsList); [object HTMLDivElement]
        const cartOverlay = document.getElementById('cartOverlay');
        const overlayBg = document.getElementById('overlayBg');
        const cartIcon = document.getElementById('cartIcon');
        const closeCart = document.getElementById('closeCart');
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');
        const totalAmount = document.getElementById('totalAmount');
        const balanceDisplay = document.getElementById('balance');
        const couponInput = document.getElementById('couponInput');
        const applyCoupon = document.getElementById('applyCoupon');
        const discountInfo = document.getElementById('discountInfo');
        const checkoutBtn = document.getElementById('checkoutBtn');

        // load data from localStorage if available
        function loadState() {
            const savedCart = localStorage.getItem('cart');
            const savedBalance = localStorage.getItem('balance');
            const savedCoupon = localStorage.getItem('couponApplied');
            
            if (savedCart) {
                cart = JSON.parse(savedCart);
                updateCartCount();
            }
            
            if (savedBalance) {
                balance = parseFloat(savedBalance);
                balanceDisplay.textContent = balance.toFixed(2);
            }
            
            if (savedCoupon) {
                couponApplied = JSON.parse(savedCoupon);
                if (couponApplied) {
                    discountInfo.style.display = 'block';
                }
            }
        }

        // save state cart,balance,coupon to localstorage
        function saveState() {
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('balance', balance.toString());
            localStorage.setItem('couponApplied', JSON.stringify(couponApplied));
        }

       

        // calculate total price with discount
        function calculateTotal() {
            let total = cart.reduce((sum, item) => sum + item.price, 0);
            
            if (couponApplied) {
                const discount = total * (discountPercent / 100);
                total -= discount;
            }
            
            return total;
        }

        

        // update cart count
        function updateCartCount() {
            cartCount.textContent = cart.length;
        }

        // add item to cart
        function addToCart(e) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            // check if product is already in cart
            if (cart.some(item => item.id === productId)) {
                return;
            }
            
            // check  balance
            const potentialTotal = calculateTotal() + product.price;
            if (potentialTotal > balance) {
                alert('Adding this item would exceed your balance.');
                return;
            }
            
            cart.push(product);
            updateCartCount();
            saveState();
            
            // update button state
            e.target.disabled = true;
            e.target.textContent = 'Added to Cart';
            
            // open cart to show added item
            toggleCart();
        }

       

        // toggle cart 
        function toggleCart() {
            cartOverlay.classList.toggle('active');
            overlayBg.classList.toggle('active');
            updateCartDisplay();
        }

       

        // event listeners
        cartIcon.addEventListener('click', toggleCart);
        closeCart.addEventListener('click', toggleCart);
        overlayBg.addEventListener('click', toggleCart);
        applyCoupon.addEventListener('click', applyCouponCode);
        
        checkoutBtn.addEventListener('click', () => {
            const total = calculateTotal();
            
            if (total <= balance) {
                balance -= total;
                balanceDisplay.textContent = balance.toFixed(2);
                cart = [];
                couponApplied = false;
                discountInfo.style.display = 'none';
                updateCartCount();
                updateCartDisplay();
                saveState();
                alert('Purchase successful! Thank you for shopping with us.\n\nTime: ' + new Date().toLocaleString());

            }
        });

        // initialize the page
        loadState();
        displayProducts();
    
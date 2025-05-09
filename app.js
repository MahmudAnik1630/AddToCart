
        let cart = [];
        let wish = [];
        let balance = 5000;
        let couponApplied = false;
        const discountPercent = 10;

        //mycustom

        const header_name = document.getElementById('header_name');

        
        const productsList = document.getElementById('productsList');
        //console.log(productsList); [object HTMLDivElement]
        const cartOverlay = document.getElementById('cartOverlay');
        const overlayBg = document.getElementById('overlayBg');
        const cartIcon = document.getElementById('cartIcon');
        const wishIcon = document.getElementById('wishIcon');
        const closeCart = document.getElementById('closeCart');
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');
        const totElement = document.querySelector('.tot');
        const totalAmount = document.getElementById('totalAmount');
        const balanceDisplay = document.getElementById('balance');
        const couponInput = document.getElementById('couponInput');
        const applyCoupon = document.getElementById('applyCoupon');
        const discountInfo = document.getElementById('discountInfo');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const balanceLeft = document.querySelector('.balancel');
       
        const pageNumberDiv  = document.getElementById('pageNumber');

        // load data from localStorage if available
        function loadState() {
            const savedCart = localStorage.getItem('cart');
            const savedWish = localStorage.getItem('wish');
            const savedBalance = localStorage.getItem('balance');
            const savedCoupon = localStorage.getItem('couponApplied');
            
           
            if (savedCart) {
                cart = JSON.parse(savedCart);
                updateCartCount();
            }

            if (savedWish) {
                wish = JSON.parse(savedWish);
                updateWishCount();
            }
            
            if (savedBalance) {
                balance = parseFloat (savedBalance);
                console.log(balance);
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
            localStorage.setItem('wish', JSON.stringify(wish));
            localStorage.setItem('balance', balance.toString());
            localStorage.setItem('couponApplied', JSON.stringify(couponApplied));
        }

       

        // calculate total price with discount
        function calculateTotal() {
            let total = cart.reduce((sum, item) => sum + item.price, 0);
            
            if (couponApplied) {
                const discount = total * (discountPercent / 100);
                total = total- discount;
            }
            
            return total;
        }

        
        function updateWishCount() {
            wishCount.textContent = wish.length;
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
                Swal.fire({
                    title: "Balance?",
                    text: "this item would exceed your balance.",
                    icon: "question"
                  });
                
                return;
            }
            
            cart.push(product);
            updateCartCount();
            saveState();
            
            // update button state
            e.target.disabled = true;
            e.target.textContent = 'Added to Cart';
            
            // open cart to show added item
            //toggleCart();
        }

       


        
        // toggle cart 
        function toggleCart() {
            cartOverlay.classList.toggle('active');
            overlayBg.classList.toggle('active');
            totElement.style.display = 'block';
            totalAmount.textContent = 'block';
            updateCartDisplay();
        }


        function toggleWish() {
            header_name.innerText = "Wish List";
            cartOverlay.classList.add('active');
            overlayBg.classList.add('active');


            totalAmount.textContent = 'none';
            discountInfo.style.display = 'none';
            checkoutBtn.style.display = 'none';
            balanceLeft.parentElement.style.display = 'none';
            couponInput.style.display='none';
            applyCoupon.style.display='none';
            totElement.style.display = 'none';
            
            

            updateWishDisplay();
        }

         // for next and prev button 
        //  let from = 0;
        //  const productsPerPage = 8;
        //  let to = productsPerPage;
        //  let pageNum = 1;
       

       

        // event listeners
        wishIcon.addEventListener('click', toggleWish);
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
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Purchase successful! Thank you for shopping with us.\n\nTime: ' + new Date().toLocaleString(),
                    showConfirmButton: false,
                    timer: 2500
                  });
                

            }
        });

        // initialize the page
        loadState();
        buttonCount();
        displayProducts();
        
        
    
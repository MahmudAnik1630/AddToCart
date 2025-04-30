 // apply coupon
 function applyCouponCode() {
    const couponCode = couponInput.value.trim();
    
    if (couponCode === 'CUPON10') {
        couponApplied = true;
        discountInfo.style.display = 'block';
        updateCartDisplay();
        saveState();
        alert('Coupon applied successfully!');
    } else {
        alert('Invalid coupon code.');
    }
}
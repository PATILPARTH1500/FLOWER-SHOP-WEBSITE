// Function to update the total price
function updateTotal() {
    let total = 0;
    const cartItems = document.querySelectorAll('.cart-item');

    cartItems.forEach(item => {
        const quantity = item.querySelector('.item-quantity').value;
        const price = item.getAttribute('data-price');
        const itemTotal = quantity * price;
        
        // Update the individual item price display
        item.querySelector('.item-price').textContent = itemTotal.toFixed(2);

        // Add to total
        total += itemTotal;
    });

    // Update the total price in the cart
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Function to remove an item from the cart
function removeItem(event) {
    const item = event.target.closest('.cart-item');
    item.remove();
    updateTotal();
}

// Event listeners for quantity change and item removal
document.querySelectorAll('.item-quantity').forEach(input => {
    input.addEventListener('change', updateTotal);
});

document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', removeItem);
});

// Initial total calculation
updateTotal();

// Function to render the cart items
function renderCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.querySelector('.shopping-cart');

    // Clear existing items
    cartContainer.innerHTML = `
        <h2>Your Shopping Cart</h2>
    `;

    if (cartItems.length === 0) {
        cartContainer.innerHTML += `<p>Your cart is empty.</p>`;
    } else {
        cartItems.forEach((item, index) => {
            cartContainer.innerHTML += `
                <div class="cart-item" data-price="${item.price}">
                    <img src="${item.image.replace('url("', '').replace('")', '')}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>Quantity: <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-index="${index}"></p>
                        <p>Price: $<span class="item-price">${(item.price * item.quantity).toFixed(2)}</span></p>
                    </div>
                    <div class="item-actions">
                        <button class="remove-item" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
        });
        cartContainer.innerHTML += `
            <div class="cart-total">
                <h3>Total: $<span id="cart-total">${calculateTotal(cartItems).toFixed(2)}</span></h3>
                <button class="checkout-btn">Proceed to Checkout</button>
            </div>
        `;
    }

    // Attach event listeners to new elements
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });

    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });
}

// Function to calculate the total price
function calculateTotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Function to remove an item from the cart
function removeItem(event) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const index = event.target.getAttribute('data-index');

    // Remove the item from the cart
    cartItems.splice(index, 1);

    // Save the updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Re-render the cart items
    renderCartItems();
}

// Function to update the quantity of an item
function updateQuantity(event) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const index = event.target.getAttribute('data-index');
    const newQuantity = parseInt(event.target.value);

    // Update the item's quantity
    cartItems[index].quantity = newQuantity;

    // Save the updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Re-render the cart items
    renderCartItems();
}

// Initialize cart items on page load
renderCartItems();

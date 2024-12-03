// Function to add an item to the cart
function addToCart(itemName, itemPrice, itemImage) {
    // Get cart items from localStorage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the item already exists in the cart
    const existingItem = cartItems.find(item => item.name === itemName);

    if (existingItem) {
        // If the item exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // If the item doesn't exist, add it to the cart
        cartItems.push({ name: itemName, price: itemPrice, image: itemImage, quantity: 1 });
    }

    // Save updated cart items to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update cart counter
    updateCartCounter();
}

// Function to update the cart counter in the navigation
function updateCartCounter() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    document.getElementById('cart-counter').textContent = cartItems.length;
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const container = button.closest('.container');
        const itemName = container.querySelector('.text span').textContent;
        const itemPrice = parseFloat(button.previousElementSibling.textContent.replace('$', ''));
        const itemImage = container.querySelector('.container > div:first-child').style.backgroundImage;

        addToCart(itemName, itemPrice, itemImage);
    });
});

// Initialize cart counter on page load
updateCartCounter();

function toggleLike(productId) {
    let likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
    const itemIndex = likedItems.indexOf(productId);

    if (itemIndex !== -1) {
        likedItems.splice(itemIndex, 1);
    } else {
        likedItems.push(productId);
    }

    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    updateLikeButtons();
}

function updateLikeButtons() {
    let likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
    document.querySelectorAll('.like-button').forEach(button => {
        const productId = button.getAttribute('data-product-id');
        const likeCountSpan = button.querySelector('.like-count');
        let likeCount = parseInt(likeCountSpan.textContent);

        if (likedItems.includes(productId)) {
            button.classList.add('liked');
            likeCountSpan.textContent = likeCount + 1;
        } else {
            button.classList.remove('liked');
            likeCountSpan.textContent = likeCount > 0 ? likeCount - 1 : 0;
        }
    });
}

document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        toggleLike(productId);
    });
});

updateLikeButtons();
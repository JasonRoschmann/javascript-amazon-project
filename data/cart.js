export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, selectedQuantity) {
    let matchingItem = cart.find(cartItem => cartItem.productId === productId);

    if (matchingItem) {
        matchingItem.quantity += selectedQuantity;
    } else {
        cart.push({
            productId,
            quantity: selectedQuantity
        });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
    cart = cart.filter(cartItem => cartItem.productId !== productId);
    saveToStorage();
}

export function calculateCartQuantity() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

export function updateCartItemQuantity(productId, quantity) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity = quantity;
        saveToStorage();
    }
}

export function updateQuantity(productId, newQuantity) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity = newQuantity;
        saveToStorage();
    }
}

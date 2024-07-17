import { deliveryOptions } from './deliveryOptions.js';
export let cart;

loadFromStorage();

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId:'1'
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId:'2'
    }];
}

export function addToCart(productId, selectedQuantity) {
    let matchingItem = cart.find(cartItem => cartItem.productId === productId);

    if (matchingItem) {
        matchingItem.quantity += selectedQuantity;
    } else {
        cart.push({
            productId,
            quantity: selectedQuantity,
            deliveryOptionId:'1'
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

export function updateDeliveryOption(productId, deliveryOptionId) {
    const productIndex = cart.findIndex((product) => product.productId === productId);
    if (productIndex!== -1) {
      const deliveryOption = deliveryOptions.find((option) => option.id === deliveryOptionId);
      if (deliveryOption) {
        cart[productIndex].deliveryOptionId = deliveryOptionId;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      // Do nothing if the delivery option ID is not valid
    }
  }
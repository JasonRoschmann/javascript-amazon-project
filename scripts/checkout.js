import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = products.find(product => product.id === productId);

    cartSummaryHTML += `
       <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
           <div class="delivery-date">
               Delivery date: Tuesday, June 21
           </div>
           <div class="cart-item-details-grid">
               <img class="product-image" src="${matchingProduct.image}">
               <div class="cart-item-details">
                   <div class="product-name">
                       ${matchingProduct.name}
                   </div>
                   <div class="product-price">
                       $${formatCurrency(matchingProduct.priceCents)}
                   </div>
                   <div class="product-quantity">
                       <span class="quantity-label-container">
                           Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                       </span>
                       <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                           Update
                       </span>
                       <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number" min="1" value="${cartItem.quantity}" style="display: none;">
                       <span class="link-primary js-save-link" data-product-id="${matchingProduct.id}" style="display: none;">
                           Save
                       </span>
                       <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                           Delete
                       </span>
                   </div>
               </div>
               <div class="delivery-options">
                   <div class="delivery-options-title">
                       Choose a delivery option:
                   </div>
                   <div class="delivery-option">
                       <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                       <div>
                           <div class="delivery-option-date">
                               Tuesday, June 21
                           </div>
                           <div class="delivery-option-price">
                               FREE Shipping
                           </div>
                       </div>
                   </div>
                   <div class="delivery-option">
                       <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                       <div>
                           <div class="delivery-option-date">
                               Wednesday, June 15
                           </div>
                           <div class="delivery-option-price">
                               $4.99 - Shipping
                           </div>
                       </div>
                   </div>
                   <div class="delivery-option">
                       <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                       <div>
                           <div class="delivery-option-date">
                               Monday, June 13
                           </div>
                           <div class="delivery-option-price">
                               $9.99 - Shipping
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>`;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

function updateCheckoutQuantity() {
    const totalQuantity = calculateCartQuantity();
    document.getElementById('checkout-quantity').textContent = totalQuantity;
    document.querySelector('.js-cart-quantity').textContent = totalQuantity; // Update the header
}

// Add event listeners to delete links
document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();

        updateCheckoutQuantity();
    });
});

// Add event listeners to update links
document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        console.log(`Update clicked for product ID: ${productId}`);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
        container.querySelector(`.js-quantity-input-${productId}`).style.display = 'initial';
        container.querySelector(`.js-save-link[data-product-id="${productId}"]`).style.display = 'initial';
        container.querySelector('.quantity-label-container').style.display = 'none';
        container.querySelector(`.js-update-link[data-product-id="${productId}"]`).style.display = 'none';

        // Add event listener for Enter key
        container.querySelector(`.js-quantity-input-${productId}`).addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                saveQuantity(productId);
            }
        });
    });
});

// Function to save the updated quantity
function saveQuantity(productId) {
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    let newQuantity = parseInt(quantityInput.value);

    // Validate new quantity
    if (isNaN(newQuantity) || newQuantity < 1 || newQuantity >= 1000) {
        alert('Please enter a valid quantity between 1 and 999.');
        return;
    }

    console.log(`Save clicked: New quantity is ${newQuantity} for product ID: ${productId}`);
    
    // Update the cart item with the new quantity
    updateQuantity(productId, newQuantity);

    // Update the quantity in the DOM
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.querySelector('.quantity-label').textContent = newQuantity;

    // Remove editing class after saving
    container.classList.remove('is-editing-quantity');
    container.querySelector(`.js-quantity-input-${productId}`).style.display = 'none';
    container.querySelector(`.js-save-link[data-product-id="${productId}"]`).style.display = 'none';
    container.querySelector('.quantity-label-container').style.display = 'initial';
    container.querySelector(`.js-update-link[data-product-id="${productId}"]`).style.display = 'initial';

    // Update the checkout and header quantity
    updateCheckoutQuantity();
}

// Add event listeners to save links
document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        saveQuantity(productId);
    });
});

updateCheckoutQuantity();

import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from '../data/deliveryOptions.js';

hello();

const today = dayjs();

function renderOrderSummary() {

    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchingProduct = products.find(product => product.id === productId);

        if (matchingProduct) {
            const deliveryOptionId = cartItem.deliveryOptionId;
            const deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);
            
            let deliveryDateString = 'Unknown delivery date';
            if (deliveryOption) {
                const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
                deliveryDateString = deliveryDate.format('dddd, MMMM D');
            }

            cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date js-delivery-date-${matchingProduct.id}">
                    Delivery date: ${deliveryDateString}
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
                        <div class="delivery-options">
                            <div class="delivery-options-title">
                                Choose a delivery option:
                            </div>
                            ${deliveryOptionsHTML(matchingProduct, cartItem)}
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');

            const priceString = deliveryOption.priceCents === 0
                ? 'FREE'
                : `$${formatCurrency(deliveryOption.priceCents)}`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `
                <div class="delivery-option">
                    <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}" data-product-id="${matchingProduct.id}" data-delivery-days="${deliveryOption.deliveryDays}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>
            `;
        });

        return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    function updateCheckoutQuantity() {
        const totalQuantity = calculateCartQuantity();
        const checkoutQuantityElement = document.getElementById('checkout-quantity');
        const cartQuantityElement = document.querySelector('.js-cart-quantity');

        if (checkoutQuantityElement) {
            checkoutQuantityElement.textContent = totalQuantity;
        }

        if (cartQuantityElement) {
            cartQuantityElement.textContent = totalQuantity;
        }
    }

    // Event-Listener für Delete-Links
    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            if (container) {
                container.remove();
            }

            updateCheckoutQuantity();
        });
    });

    // Event-Listener für Update-Links
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

            // Event-Listener für Enter-Taste
            container.querySelector(`.js-quantity-input-${productId}`).addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    saveQuantity(productId);
                }
            });
        });
    });

    // Funktion zum Speichern der neuen Menge
    function saveQuantity(productId) {
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
        let newQuantity = parseInt(quantityInput.value);

        // Validierung der neuen Menge
        if (isNaN(newQuantity) || newQuantity < 1 || newQuantity >= 1000) {
            alert('Please enter a valid quantity between 1 and 999.');
            return;
        }

        console.log(`Save clicked: New quantity is ${newQuantity} for product ID: ${productId}`);
        
        // Aktualisieren des Warenkorbartikels mit der neuen Menge
        updateQuantity(productId, newQuantity);

        // Aktualisieren der Menge im DOM
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.querySelector('.quantity-label').textContent = newQuantity;

        // Entfernen der Bearbeitungsklasse nach dem Speichern
        container.classList.remove('is-editing-quantity');
        container.querySelector(`.js-quantity-input-${productId}`).style.display = 'none';
        container.querySelector(`.js-save-link[data-product-id="${productId}"]`).style.display = 'none';
        container.querySelector('.quantity-label-container').style.display = 'initial';
        container.querySelector(`.js-update-link[data-product-id="${productId}"]`).style.display = 'initial';

        // Aktualisieren der Gesamtmenge im Checkout und Header
        updateCheckoutQuantity();
    }

    // Event-Listener für Save-Links
    document.querySelectorAll('.js-save-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            saveQuantity(productId);
        });
    });

    // Event-Listener für Delivery-Option-Links
    document.querySelectorAll('.delivery-option-input').forEach((input) => {
        input.addEventListener('change', () => {
            const productId = input.dataset.productId;
            const deliveryDays = parseInt(input.dataset.deliveryDays);
            const newDeliveryDate = today.add(deliveryDays, 'days');
            const newDeliveryDateString = newDeliveryDate.format('dddd, MMMM D');

            // Update the delivery date in the DOM
            const deliveryDateElement = document.querySelector(`.js-delivery-date-${productId}`);
            deliveryDateElement.textContent = `Delivery date: ${newDeliveryDateString}`;
        });
    });

    updateCheckoutQuantity();
}

renderOrderSummary();

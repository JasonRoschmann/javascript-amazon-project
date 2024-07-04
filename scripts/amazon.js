import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${formatCurrency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                Add to Cart
            </button>
            <p class="added-to-cart" id="addedToCart${product.id}">
                <img src="images/icons/checkmark.png"> Added!
            </p>
        </div>
    `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function addTimeOut(productId) {
    const addedtoCart = document.getElementById(`addedToCart${productId}`); // Get corresponding message element

    addedtoCart.classList.add('visible');

    // Clear any existing timeout to reset the 2-second timer
    if (addedtoCart.messageTimeout) {
        clearTimeout(addedtoCart.messageTimeout);
    }

    // Hide the message after 2 seconds
    addedtoCart.messageTimeout = setTimeout(() => {
        addedtoCart.classList.remove('visible');
    }, 2000);
}

function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

// Add event listeners to each "Add to Cart" button
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const { productId } = button.dataset; // Destructuring to get productId

        // Find the selected quantity
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const selectedQuantity = Number(quantitySelector.value); // Convert to a number

        addToCart(productId, selectedQuantity);
        updateCartQuantity();
        addTimeOut(productId);
    });
});

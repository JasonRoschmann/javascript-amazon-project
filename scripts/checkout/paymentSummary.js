import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOptionById } from "../../data/deliveryOptions.js";
import { formatCurrency } from '../utils/money.js';

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let totalQuantity = calculateCartQuantity(); // Calculate total quantity from cart

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        if (product) {
            productPriceCents += product.priceCents * cartItem.quantity;
        } else {
            console.error(`Product not found for ID: ${cartItem.productId}`);
        }

        const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptionId);
        if (deliveryOption) {
            shippingPriceCents += deliveryOption.priceCents;
        } else {
            console.error(`Delivery option not found for ID: ${cartItem.deliveryOptionId}`);
        }
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = Math.round(totalBeforeTaxCents * 0.1); // Ensure tax is rounded to nearest cent
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">
                $${formatCurrency(productPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
                $${formatCurrency(shippingPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
                $${formatCurrency(totalBeforeTaxCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
                $${formatCurrency(taxCents)}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
                $${formatCurrency(totalCents)}
            </div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;

    const paymentSummaryElement = document.querySelector('.js-payment-summary');
    if (paymentSummaryElement) {
        paymentSummaryElement.innerHTML = paymentSummaryHTML;
    } else {
        console.error('Payment summary element not found.');
    }
}

// Call the function to render the payment summary
renderPaymentSummary();

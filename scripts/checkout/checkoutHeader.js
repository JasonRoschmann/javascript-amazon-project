import { calculateCartQuantity } from "../../data/cart.js";

const totalQuantity = calculateCartQuantity();
renderCheckoutHeader(totalQuantity);

export function renderCheckoutHeader(totalQuantity) {
    const paymentSummaryRowHTML = `
        <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <!-- Weitere Inhalte hier -->
        </div>
    `;

    // Finde das Checkout-Header-Element im DOM
    const checkoutHeaderElement = document.querySelector('.checkout-header');
    if (checkoutHeaderElement) {
        checkoutHeaderElement.innerHTML = paymentSummaryRowHTML;
    } else {
        console.error('Checkout header element not found.');
    }
}

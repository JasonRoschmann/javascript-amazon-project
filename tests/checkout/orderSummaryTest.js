import { renderOrderSummary } from './orderSummary.js';
import { cart, updateQuantity } from '../../data/cart.js';
import { products, getProduct, loadProducts } from '../../data/products.js';
import { deliveryOptions, getDeliveryOptionById } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

describe('order summary tests', () => {

    beforeAll((done) => {
        loadProducts(() => {
            done();
        });
    });
    
    beforeEach(() => {
        const testContainer = document.createElement('div');
        testContainer.className = 'js-test-container';
        document.body.appendChild(testContainer);

        products.push({
            id: 'product1',
            name: 'Test Product 1',
            priceCents: 1000,
            image: 'test-product1.jpg'
        });

        cart.push({
            productId: 'product1',
            quantity: 1,
            deliveryOptionId: '1'
        });

        deliveryOptions.push(
            { id: '1', deliveryDays: 3, priceCents: 500 },
            { id: '2', deliveryDays: 2, priceCents: 1000 },
            { id: '3', deliveryDays: 1, priceCents: 1498 }
        );

        spyOn(renderPaymentSummary, 'render').and.callFake(() => {
            const paymentSummaryContainer = document.querySelector('.js-payment-summary');
            if (paymentSummaryContainer) {
                paymentSummaryContainer.innerHTML = `
                    <div class="shipping-price">$14.98</div>
                    <div class="total-price">$63.50</div>
                `;
            }
        });
    });

    afterEach(() => {
        const testContainer = document.querySelector('.js-test-container');
        if (testContainer) {
            testContainer.innerHTML = '';
        }

        products.length = 0;
        cart.length = 0;
        deliveryOptions.length = 0;
    });

    it('updates the delivery option correctly', () => {
        renderOrderSummary();

        const deliveryOptionElement = document.querySelector('.js-delivery-option-product1-3');
        const deliveryOptionInput = document.querySelector('.js-delivery-option-input-product1-3');

        // Simulate clicking the 3rd delivery option
        deliveryOptionInput.click();

        // Check if the input inside this delivery option is now checked
        expect(deliveryOptionInput.checked).toBeTrue();

        // Check the cart length is correct
        expect(cart.length).toEqual(1);

        // Check the first product in the cart
        const firstCartItem = cart[0];
        expect(firstCartItem.productId).toEqual('product1');
        expect(firstCartItem.deliveryOptionId).toEqual('3');

        // After updating the delivery option, the payment summary should be displayed
        const shippingPriceElement = document.querySelector('.shipping-price');
        const totalPriceElement = document.querySelector('.total-price');

        expect(shippingPriceElement).not.toBeNull();
        expect(shippingPriceElement.textContent).toEqual('$14.98');

        expect(totalPriceElement).not.toBeNull();
        expect(totalPriceElement.textContent).toEqual('$63.50');
    });
});

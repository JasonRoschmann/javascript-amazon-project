import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { deliveryOptions } from '../../data/deliveryOptions.jsS';

describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        // Add the new expectation
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    });

    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual();

        // Add the new expectation
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    });
});

describe('test suite: removeFromCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
    });

    it('removes a product that is in the cart', () => {
        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    });

    it('tries to remove a product that is not in the cart', () => {
        removeFromCart('non-existing-product-id');
        expect(cart.length).toEqual(1); // Cart should remain unchanged
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); // Only one call, for initial load
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    });
});

describe('test suite: updateDeliveryOption', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
    });

    it('updates the delivery option of a product in the cart', () => {
        updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '2');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].deliveryOptionId).toEqual('2');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    });

    it('does nothing when updating the delivery option of a productId not in the cart', () => {
        updateDeliveryOption('non-existing-product-id', '3');
        expect(cart.length).toEqual(1); // Cart should remain unchanged
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].deliveryOptionId).toEqual('1'); // Delivery option should remain unchanged
        expect(localStorage.setItem).toHaveBeenCalledTimes(0); // localStorage.setItem should not be called
    });
});


describe('test suite: updateDeliveryOption', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
    });

    it('updates the delivery option of a product in the cart', () => {
        updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '2');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].deliveryOptionId).toEqual('2');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    });

    it('does nothing when updating with a non-existing delivery option id', () => {
        // Simulate a deliveryOptionId that does not exist
        const nonExistingDeliveryOptionId = 'non-existing-delivery-option-id';
        
        updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', nonExistingDeliveryOptionId);
        
        // Cart should remain unchanged
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].deliveryOptionId).toEqual('1'); // Delivery option should remain unchanged
        
        // localStorage.setItem should not be called
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});
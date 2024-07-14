import {formatCurrency} from '../../scripts/utils/money.js';

console.log('test suite: formatCurrency');


console.log('converts cents into dollars');

if (formatCurrency(2095) === '20.95') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('works with 0')

if (formatCurrency(0) === '0.00') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('rounds up to the nearest cent');

if (formatCurrency(2000.5) === '20.01') {
    console.log('passed');
} else {
    console.log('failed');
}


describe('formatCurrency', () => {
    it('correctly formats 2000.4 to two decimal places', () => {
        const result = formatCurrency(2000.4);
        expect(result).toBe('20.00');
    });

    it('correctly formats 1234 to two decimal places', () => {
        const result = formatCurrency(1234);
        expect(result).toBe('12.34');
    });

    it('correctly formats -5678 to two decimal places', () => {
        const result = formatCurrency(-5678);
        expect(result).toBe('-56.78');
    });

    // Add more test cases as needed
});

describe('updateCart', () => {
    it('should call localStorage.setItem with the correct arguments', () => {
        // Mock localStorage.setItem
        spyOn(localStorage, 'setItem');

        // Function that should trigger the localStorage.setItem call
        function updateCart(cart) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Call the function
        updateCart([]);

        // Check if localStorage.setItem was called with the correct arguments
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[]');
    });
});
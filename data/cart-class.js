class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId, selectedQuantity) {
        let matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

        if (matchingItem) {
            matchingItem.quantity += selectedQuantity;
        } else {
            this.cartItems.push({
                productId,
                quantity: selectedQuantity,
                deliveryOptionId: '1'
            });
        }

        this.saveToStorage();
    }

    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
        this.saveToStorage();
    }

    calculateCartQuantity() {
        return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartItemQuantity(productId, quantity) {
        const cartItem = this.cartItems.find(item => item.productId === productId);
        if (cartItem) {
            cartItem.quantity = quantity;
            this.saveToStorage();
        }
    }

    updateQuantity(productId, newQuantity) {
        const cartItem = this.cartItems.find(item => item.productId === productId);
        if (cartItem) {
            cartItem.quantity = newQuantity;
            this.saveToStorage();
        }
    }

    updateDeliveryOption(productId, newDeliveryOptionId) {
        const cartItem = this.cartItems.find(item => item.productId === productId);
        if (!cartItem) {
            return; // Product not found in cart, do nothing
        }

        cartItem.deliveryOptionId = newDeliveryOptionId;
        this.saveToStorage();
    }
}




const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart); 

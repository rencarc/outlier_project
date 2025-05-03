// js/script.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Update cart count in header
    function updateCartCount() {
        const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('#cart-count').forEach(el => {
            el.textContent = cartCount;
        });
    }

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const product = {
                id: id,
                name: e.target.closest('.product-card, .product-details').querySelector('h1, h3').textContent,
                price: parseFloat(e.target.closest('.product-card, .product-details').querySelector('.price').textContent.replace('$', '')),
                quantity: 1,
                image: e.target.closest('.product-card, .product-details').querySelector('img').src
            };

            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        });
    });

    // Buy now functionality
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', () => {
            alert('Thank you for your purchase!');
        });
    });

    // Cart page functionality
    if (document.querySelector('.cart-page')) {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartTotalElement = document.querySelector('#cart-total');

        function renderCart() {
            cartItemsContainer.innerHTML = '';
            let total = 0;

            cart.forEach(item => {
                total += item.price * item.quantity;
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                    <div class="quantity-controls">
                        <button class="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase">+</button>
                    </div>
                    <button class="remove">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });

            cartTotalElement.textContent = total.toFixed(2);

            // Add event listeners for quantity controls and remove
            document.querySelectorAll('.decrease').forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    if (cart[index].quantity > 1) {
                        cart[index].quantity--;
                    } else {
                        cart.splice(index, 1);
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    updateCartCount();
                });
            });

            document.querySelectorAll('.increase').forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    cart[index].quantity++;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    updateCartCount();
                });
            });

            document.querySelectorAll('.remove').forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    updateCartCount();
                });
            });
        }

        renderCart();

        // Checkout functionality
        document.querySelector('.checkout').addEventListener('click', () => {
            alert('Thank you for your purchase!');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        });
    }

    // Redirect to cart page when clicking cart icon
    document.querySelectorAll('.cart').forEach(cartIcon => {
        cartIcon.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    });
});
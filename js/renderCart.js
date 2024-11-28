function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const sidebarContent = document.getElementById("sidebar");

    // Calcula el total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    sidebarContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <h4 class="fw-bold">Carrito de Compras</h4>
            <button class="btn-close" aria-label="Close" onclick="closeCart()"></button>
        </div>
        <div id="cart-items" class="d-flex flex-column gap-3"></div>
        <hr>
        <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="fw-bold fs-5">Total:</span>
            <span class="fw-bold fs-5 text-success">$${total.toFixed(2)}</span>
        </div>
        <button id="clearCartButton" class="btn btn-danger w-100 mb-2" onclick="clearCart()">Vaciar Carrito</button>
        <button id="checkoutButton" class="btn btn-success w-100" onclick="checkout()">Finalizar Compra</button>
    `;

    const cartItems = document.getElementById("cart-items");

    if (cart.length === 0) {
        cartItems.innerHTML = "<p class='text-muted'>El carrito está vacío.</p>";
        document.getElementById("clearCartButton").disabled = true;
        document.getElementById("checkoutButton").disabled = true;
    } else {
        document.getElementById("clearCartButton").disabled = false;
        document.getElementById("checkoutButton").disabled = false;

        cart.forEach((item, index) => {
            const itemHTML = `
                <div class="card shadow-sm">
                    <div class="card-body">
                        <div class="d-flex align-items-start gap-3">
                            <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px;">
                            <div class="flex-grow-1">
                                <p class="fw-bold mb-1">${item.title}</p>
                                <p class="text-muted mb-2">$${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                        <div class="cart-controls d-flex justify-content-between align-items-center mt-2">
                            <div class="d-flex align-items-center gap-2">
                                <button class="btn btn-sm btn-danger" onclick="updateQuantity(${index}, -1)" ${item.quantity === 1 ? "disabled" : ""}>-</button>
                                <span class="fw-bold">${item.quantity}</span>
                                <button class="btn btn-sm btn-success" onclick="updateQuantity(${index}, 1)">+</button>
                            </div>
                            <button class="btn btn-sm btn-dark" onclick="removeItem(${index})">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-trash">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            cartItems.insertAdjacentHTML("beforeend", itemHTML);
        });
    }
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Elimina el elemento seleccionado
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;

    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

const cartButton = document.getElementById("cart-button");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

cartButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
    renderCart();
});

overlay.addEventListener("click", closeCart);

function closeCart() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
}

function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!window.currentProduct) {
        Swal.fire({
            title: "Error",
            text: "No se pudo agregar el producto al carrito.",
            icon: "error",
            customClass: {
                confirmButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        return;
    }

    const productIndex = cart.findIndex(item => item.id === window.currentProduct.id);

    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ ...window.currentProduct, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();

    Swal.fire({
        title: "Se añadió el artículo al carrito!",
        icon: "success",
        customClass: {
            confirmButton: "btn btn-success"
        },
        buttonsStyling: false
    });

    const productModal = bootstrap.Modal.getInstance(document.getElementById("productModal"));
    productModal.hide();
}



function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalItems;
}


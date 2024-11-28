function clearCart() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success m-2",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "¿Estás seguro?",
        text: "No vas a poder revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, vaciar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
                title: "Vaciado!",
                text: "Tu carrito vuelve a estar vacío :(",
                icon: "success"
            });
            localStorage.removeItem("cart");
            renderCart();
            updateCartCount();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Tu carrito sigue intacto :)",
                icon: "error"
            });
        }
    });
}

function checkout() {
    Swal.fire({
        title: "Muchas gracias!",
        text: "Tu compra acaba de ser procesada!",
        icon: "success",
        customClass: {
            confirmButton: "btn btn-success"
        },
        buttonsStyling: false
    }).then(() => {
        localStorage.removeItem("cart");
        renderCart();
        updateCartCount();
    });
}

function closeSidebar() {
    document.getElementById("sidebar").classList.remove("open");
}

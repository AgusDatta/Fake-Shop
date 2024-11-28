function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Limpia el contenedor antes de agregar productos
    products.forEach((product) => {
        productList.insertAdjacentHTML(
            "beforeend",
            `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title text-truncate">${product.title}</h5>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary w-100" onclick="showModal(${product.id})">Ver más</button>
                    </div>
                </div>
            </div>
            `
        );
    });
}

function showModal(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            // Guarda el producto actual en window.currentProduct
            window.currentProduct = product;

            // Actualiza el título
            document.getElementById("modalTitle").textContent = product.title;

            // Actualiza la imagen
            document.getElementById("modalImage").src = product.image;

            // Actualiza el contenido del cuerpo del modal
            document.getElementById("modalBody").innerHTML = `
                <p class="mb-3">${product.description}</p>
                <p class="fs-4 fw-bold text-dark">$${product.price.toFixed(2)}</p>
            `;

            // Muestra el modal
            const productModal = new bootstrap.Modal(document.getElementById("productModal"));
            productModal.show();
        })
        .catch(error => console.error("Error fetching product details:", error));
}



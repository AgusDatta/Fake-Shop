document.addEventListener("DOMContentLoaded", () => {
    fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => displayProducts(data));

    updateCartCount();
    adjustMainMargin();

    window.addEventListener("resize", adjustMainMargin);
});

function adjustMainMargin() {
    const headerHeight = document.querySelector("header .navbar").offsetHeight;
    document.querySelector("main").style.marginTop = `${headerHeight}px`;
}

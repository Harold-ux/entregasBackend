const socket = io();
let currentPage = 1;
const productsPerPage = 5;

socket.on("connect", () => {
    console.log("Conectado al servidor WebSocket");
    loadProducts();
});

socket.on("updateProducts", (products) => {
    renderProducts(products);
});

function loadProducts() {
    socket.emit("getProducts", { page: currentPage, limit: productsPerPage });
}

function renderProducts(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("card", "product-card");
        productCard.style.width = "18rem";
        productCard.dataset.id = product._id;

        const photo = product.photo || "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminada-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg";

        productCard.innerHTML = `
            <img src="${photo}" class="card-img-top" alt="Product photo">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">💲 ${product.price} - 📦 Stock: ${product.stock}</p>
                <button class="btn btn-danger delete-btn" data-id="${product._id}">Delete</button>
            </div>
        `;

        productList.appendChild(productCard);
    });

    updatePaginationControls();
}

function updatePaginationControls() {
    document.getElementById("pageInfo").textContent = `Page ${currentPage}`;
    document.getElementById("prevPage").disabled = currentPage === 1; // Deshabilitar si es la primera página
    // Aquí puedes agregar lógica para deshabilitar el botón "Next" si no hay más productos
}

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        loadProducts();
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    currentPage++;
    loadProducts();
});

const form = document.getElementById("addProductForm");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);
    const photo = "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminada-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg";

    if (!title || isNaN(price) || isNaN(stock)) {
        alert("Por favor, completa todos los campos");
        return;
    }

    socket.emit("addProduct", { title, price, stock, photo });
    form.reset();
});

// Manejo de eliminación de productos
document.getElementById("productList").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const productId = event.target.dataset.id;
        if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            socket.emit("deleteProduct", productId);
        }
    }
});
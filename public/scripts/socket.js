/* console.log("Connecting to script!");

const socket = io();

const addProductForm = document.getElementById("addProductForm");
const productList = document.getElementById("productList");

// Agregar producto
addProductForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const stock = parseInt(document.getElementById("stock").value);
  const image = ""; // El servidor usará una imagen predeterminada si no se proporciona

  if (!title || isNaN(price) || isNaN(stock)) {
    alert("All fields are required.");
    return;
  }

  socket.emit("addProduct", { title, price, stock, image });

  addProductForm.reset();
});

// Escuchar la actualización de productos desde el servidor
socket.on("updateProducts", (products) => {
  productList.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("card", "product-card");
    productDiv.style.width = "18rem";
    productDiv.dataset.id = product._id;

    productDiv.innerHTML = `
      <img src="${product.image || "/img/default-product.png"}" class="card-img-top" alt="Product Image">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">💲 ${product.price} - 📦 Stock: ${product.stock}</p>
        <button class="btn btn-danger delete-btn" data-id="${product._id}">Delete</button>
      </div>
    `;
    productList.appendChild(productDiv);
  });
});

// Eliminar producto
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const productId = event.target.dataset.id;
    if (confirm("Are you sure you want to delete this product?")) {
      socket.emit("deleteProduct", productId);
    }
  }
});
 */
document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  const addProductForm = document.getElementById("addProductForm");
  const productList = document.getElementById("productList");

  if (!addProductForm || !productList) {
    console.error("Elementos no encontrados en el DOM.");
    return;
  }

  // Add product
  addProductForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);
    const photo = faker.image.imageUrl();

    if (!title || isNaN(price) || isNaN(stock)) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const newProduct = {
      title,
      price,
      stock,
      photo: photo || "/img/default-product.png",
    };

    socket.emit("addProduct", newProduct);
    addProductForm.reset();
  });

  socket.on("updateProducts", (products) => {
    productList.innerHTML = "";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("card", "product-card");
      productCard.style.width = "18rem";
      productCard.dataset.id = product._id;
      productCard.innerHTML = 
        `<img src="${product.photo || "/img/default-product.png"}" class="card-img-top" alt="Product Image">
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">💲 ${product.price} - 📦 Stock: ${product.stock}</p>
            <button class="btn btn-danger delete-btn" data-id="${product._id}">Delete</button>
        </div>`;
      productList.appendChild(productCard);
    });
  });

  // Eliminar producto
  productList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const productId = event.target.dataset.id;
      if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
        event.target.closest(".card").remove();
        socket.emit("deleteProduct", productId);
      }
    }
  });
});

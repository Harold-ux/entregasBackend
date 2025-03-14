// public/scripts/product.js
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButton = document.querySelector(".add-to-cart");

  if (addToCartButton) {
    addToCartButton.addEventListener("click", async (event) => {
      const productId = event.target.id; // ID del producto
      const quantity = document.getElementById("quantity").value;
      const userId = "USER_ID"; // Reemplaza esto con el ID del usuario actual

      try {
        const response = await fetch("/api/carts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            product_id: productId,
            quantity: quantity,
          }),
        });

        if (!response.ok) {
          throw new Error("Error al agregar el producto al carrito");
        }

        const data = await response.json();
        alert("Producto agregado al carrito: " + data.response.title);
      } catch (error) {
        console.error("Error:", error);
        alert("No se pudo agregar el producto al carrito. Inténtalo de nuevo.");
      }
    });
  }
});
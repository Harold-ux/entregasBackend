// src/public/scripts/index.js

document.addEventListener("DOMContentLoaded", () => {
    // Eliminar producto
    document.querySelectorAll('.button[data-id]').forEach(button => {
      button.addEventListener('click', async (event) => {
        const productId = event.target.dataset.id;
        try {
          const response = await fetch(`/product/${productId}/delete`, { method: 'DELETE' });
          if (response.ok) {
            // Elimina el producto de la interfaz
            event.target.closest('.card').remove();
          } else {
            alert('Error al eliminar el producto');
          }
        } catch (error) {
          console.error('Error al eliminar el producto:', error);
        }
      });
    });
  
    // Paginación
    document.querySelectorAll('.pagination-button').forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();  // Evitar la recarga de la página
        const url = event.target.href;
        
        // Realizar la llamada AJAX (fetch) para obtener los productos de la siguiente página
        fetch(url)
          .then(response => response.json())
          .then(data => {
            // Aquí puedes actualizar el contenido de la página con los nuevos productos
            // Ejemplo: actualizando el HTML de la sección de productos
            const productContainer = document.querySelector('.products-real');
            productContainer.innerHTML = '';  // Limpiar productos actuales
  
            // Agregar nuevos productos
            data.products.forEach(product => {
              const productCard = document.createElement('div');
              productCard.classList.add('card');
              productCard.style.width = '18rem';
              productCard.innerHTML = `
                ${product.image ? `<img src="${product.image}" class="card-img-top" alt="Product Image" />` : `<img src="https://static.thenounproject.com/png/1247947-200.png" class="card-img-top" alt="Default Image" />`}
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="attribute">💲 ${product.price}</span>
                    <span class="attribute">📦 Stock: ${product.stock}</span>
                  </div>
                  <div class="button-container">
                    <a href="/product/${product._id}" class="button">View more</a>
                    <button class="button" data-id="${product._id}">Delete</button>
                  </div>
                </div>
              `;
              productContainer.appendChild(productCard);
            });
  
            // Actualizar la paginación
            const paginationContainer = document.querySelector('.pagination-container');
            paginationContainer.innerHTML = ''; // Limpiar botones de paginación
            if (data.hasPrevPage) {
              paginationContainer.innerHTML += `<a href="/products?page=${data.prevPage}&query=${data.query}" class="pagination-button">Previous</a>`;
            }
            if (data.hasNextPage) {
              paginationContainer.innerHTML += `<a href="/products?page=${data.nextPage}&query=${data.query}" class="pagination-button">Next</a>`;
            }
          })
          .catch(error => console.error('Error al cargar la siguiente página:', error));
      });
    });
  });
  
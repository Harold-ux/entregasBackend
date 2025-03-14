
# Proyecto Final Backend de E-Commerce - Comisión 72855

## Descripción

Este proyecto es una implementación de backend para una plataforma de e-commerce. Proporciona APIs para la gestión de productos, usuarios y carritos, junto con actualizaciones en tiempo real utilizando WebSockets. La aplicación utiliza Express.js para el servidor, Handlebars para la creación de plantillas y almacenamiento basado en MongoDB para la gestión de datos.

## Tabla de Contenidos

1.  [Instalación](#instalación)
2.  [Estructura del Proyecto](#estructura-del-proyecto)
3.  [Funcionalidades Clave](#funcionalidades-clave)
4.  [Endpoints de la API](#endpoints-de-la-api)
5.  [Middlewares](#middlewares)
6.  [Vistas](#vistas)
7.  [Implementación de WebSocket](#implementación-de-websocket)
8.  [Uso](#uso)
9.  [Contribución](#contribución)

## Instalación

1.  Clona el repositorio:

    ```bash
    git clone https://github.com/Harold-ux/entregas-back-72855.git
    ```

2.  Navega al directorio del proyecto:

    ```bash
    cd tu-proyecto
    ```

3.  Instala las dependencias:

    ```bash
    npm install
    ```

4.  Configura las variables de entorno en `.env` para conectar a MongoDB.

## Estructura del Proyecto

```
├── node_modules/
├── public/
│ ├── assets/
│ │ └── fondo.jpeg
│ ├── index.css
│ ├── realtimeproducts.js
│ └── socket.js
├── src/
│ ├── controllers/
│ │ ├── carts.controller.js
│ │ ├── products.controller.js
│ │ ├── users.controller.js
│ │ └── views.controller.js
│ ├── data/
│ │ ├── fs/
│ │ │ ├── files/
│ │ │ │ └── products.json
│ │ │ ├── carts.en.js
│ │ │ ├── products.en.js
│ │ │ └── users.en.js
│ │ ├── memory/
│ │ │ ├── products.memory.js
│ │ │ └── users.memory.js
│ │ └── manager.en.js
│ ├── middlewares/
│ │ ├── errorHandler.mid.js
│ │ ├── isValidProduct.mid.js
│ │ ├── isValidUser.mid.js
│ │ └── pathHandler.mid.js
│ ├── routers/
│ │ ├── api/
│ │ │ ├── carts.api.js
│ │ │ ├── index.api.js
│ │ │ ├── products.api.js
│ │ │ └── users.api.js
│ │ ├── index.router.js
│ │ └── views.router.js
│ ├── utils/
│ │ └── utils.js
│ └── views/
│ ├── layouts/
│ │ └── main.handlebars
│ ├── cart.handlebars
│ ├── index.handlebars
│ ├── product.handlebars
│ ├── profile.handlebars
│ ├── realTimeProducts.handlebars
│ └── socket.handlebars
├── .gitignore
├── package-lock.json
├── package.json
└── server.js
```

## Funcionalidades Clave

*   **Gestión de Productos**:
    *   Crear, leer, actualizar y eliminar productos.
    *   Filtrar productos por categoría.
    *   Paginación de productos.
*   **Gestión de Usuarios**:
    *   Crear, leer, actualizar y eliminar usuarios.
    *   Filtrar usuarios por rol.
*   **Gestión de Carritos**:
    *   Crear carritos.
    *   Añadir productos a los carritos.
    *   Ver el contenido de los carritos.
    *   Actualizar la cantidad de productos en el carrito.
    *   Eliminar productos del carrito.
*   **Actualizaciones en Tiempo Real**:
    *   Utilizar WebSockets para proporcionar actualizaciones en tiempo real de los listados de productos.
    *   Implementar una función de chat en tiempo real.
*   **Plantillas**:
    *   Utilizar Handlebars para renderizar vistas dinámicas para productos, carritos y perfiles de usuario.

## Endpoints de la API

### Productos

*   `GET /api/products`: Obtener todos los productos, opcionalmente filtrar por categoría.
*   `POST /api/products`: Crear un nuevo producto.
*   `GET /api/products/:pid`: Obtener un producto por ID.
*   `PUT /api/products/:pid`: Actualizar un producto por ID.
*   `DELETE /api/products/:pid`: Eliminar un producto por ID.
*   `GET /api/products?page=1&limit=10`: Paginar productos.

### Usuarios

*   `POST /api/users`: Crear un nuevo usuario.
*   `GET /api/users/:uid`: Obtener un usuario por ID.
*   `GET /api/users`: Obtener todos los usuarios, opcionalmente filtrar por rol.
*   `PUT /api/users/:uid`: Actualizar un usuario por ID.
*   `DELETE /api/users/:uid`: Eliminar un usuario por ID.

### Carritos

*   `POST /api/carts`: Crear un nuevo carrito.
*   `GET /api/carts/:cid`: Obtener un carrito por ID.
*   `GET /api/carts`: Obtener todos los carritos.
*   `POST /api/carts/:cid/product/:pid`: Añadir un producto a un carrito.
*   `PUT /api/carts/:cid`: Actualizar la cantidad de un producto en un carrito.
*   `DELETE /api/carts/:cid`: Eliminar un producto del carrito.

## Middlewares

*   Manejo de errores para respuestas de error consistentes.
*   Validación de datos para productos y usuarios.

## Vistas

El proyecto utiliza plantillas Handlebars para renderizar contenido dinámico.

*   `index.handlebars`: Muestra una lista de productos.
*   `product.handlebars`: Detalles de un producto.
*   `cart.handlebars`: Contenido del carrito.
*   `profile.handlebars`: Perfil del usuario.
*   `realTimeProducts.handlebars`: Lista de productos en tiempo real.
*   `socket.handlebars`: Interfaz de chat en tiempo real.

## Implementación de WebSocket

*   El archivo `server.js` configura un servidor WebSocket utilizando Socket.io.
*   Los clientes pueden conectarse al servidor y recibir actualizaciones en tiempo real de los listados de productos.
*   La vista `realTimeProducts.handlebars` incluye JavaScript del lado del cliente para gestionar la adición y eliminación de productos a través de WebSockets.

## Uso

1.  Inicia el servidor:

    ```bash
    npm run dev
    ```

2.  Abre tu navegador y navega a `http://localhost:8080` para ver la página de inicio.

3.  Utiliza los endpoints de la API para gestionar productos, usuarios y carritos.

## Contribución

Siéntete libre de contribuir a este proyecto enviando pull requests.

---

### README para la Estructura del Proyecto

# Estructura del Proyecto

Este proyecto está organizado en carpetas y archivos que facilitan su mantenimiento y escalabilidad. A continuación, se describe cada componente clave:

## Carpetas Principales

- **`node_modules/`**: Contiene las dependencias instaladas del proyecto.
- **`public/`**: Archivos estáticos como CSS, JavaScript y assets visuales.
  - **`assets/`**: Imágenes y otros archivos multimedia.
  - **`index.css`**: Hoja de estilos principal.
  - **`realtimeproducts.js` y `socket.js`**: Scripts para funcionalidades en tiempo real.
- **`src/`**: Código fuente del proyecto.
  - **`controllers/`**: Controladores de ruta para la gestión de datos.
  - **`data/`**: Implementaciones de gestión de datos.
    - **`fs/`**: Almacenamiento basado en archivos (JSON).
    - **`memory/`**: Almacenamiento en memoria (para pruebas).
    - **`mongo/`**: Almacenamiento basado en MongoDB.
      - **`managers/`**: Lógica de negocio para MongoDB.
      - **`models/`**: Definiciones de modelos para MongoDB.
  - **`helpers/`: Funciones auxiliares.
  - **`middlewares/`: Middleware para validación y manejo de errores.
  - **`routers/`: Definiciones de rutas para la API y vistas.
  - **`views/`: Plantillas Handlebars para renderizar contenido dinámico.
- **`.env`**: Variables de entorno para configuración.
- **`.gitignore`**: Archivos ignorados por Git.
- **`package-lock.json` y `package.json`: Metadatos del proyecto.
- **`README.md`: Documentación principal del proyecto.
- **`server.js`: Archivo principal del servidor.
- **`utils.js`: Funciones de utilidad generales.

## Uso

Para comenzar a trabajar con este proyecto, asegúrate de instalar las dependencias necesarias y configurar las variables de entorno según sea necesario. Luego, puedes iniciar el servidor y acceder a las funcionalidades a través de los endpoints definidos en la documentación principal.

## Desarrollador: Harold Díaz
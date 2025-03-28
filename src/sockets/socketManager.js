// src/sockets/socketManager.js
import { Server } from "socket.io";
import productsManager from "../data/mongo/managers/products.mongo.js";

export const setupWebSocket = (server) => {
    const io = new Server(server);

    io.on("connection", async (socket) => {
        console.log("🟢 New user connected");

        // Emitir la lista de productos al nuevo cliente
        socket.emit("updateProducts", await productsManager.read());

        // Evento: Agregar un producto
        socket.on("addProduct", async (productData) => {
            try {
                if (!productData.image) {
                    productData.image = "https://static.thenounproject.com/png/1247947-200.png"; // Imagen predeterminada
                }
                await productsManager.create(productData);
                // Actualizar la lista de productos para todos los clientes
                io.emit("updateProducts", await productsManager.read());
            } catch (error) {
                console.error("❌ Error adding product:", error);
            }
        });

        // Evento: Eliminar un producto
        socket.on("deleteProduct", async (productId) => {
            try {
                const deleted = await productsManager.deleteById(productId);
                if (!deleted) {
                    console.log(`⚠️ Product with ID ${productId} not found`);
                    return;
                }
                // Actualizar la lista de productos para todos los clientes
                io.emit("updateProducts", await productsManager.read());
            } catch (error) {
                console.error("❌ Error deleting the product:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("🔴 User disconnected");
        });
    });

    return io;
};
// src/server.js
import "dotenv/config.js";
import express from "express";
import { engine } from "express-handlebars";
import http from "http";
import morgan from "morgan";
import path from "path";
import { setupWebSocket } from "./src/sockets/socketManager.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import router from "./src/routers/index.router.js";
import viewsRouter from "./src/routers/views.router.js";
import { rootDir } from "./utils.js";
import connectToMongo  from "./src/helpers/mongo.helper.js";
import productsRouter from "./src/routers/api/products.router.js";


// Conectar a MongoDB antes de iniciar el servidor
connectToMongo();

// Configuración del servidor
const app = express();
const server = http.createServer(app);
const io = setupWebSocket(server); // Configurar WebSocket

// Integrar la lógica de productos en tiempo real
setupWebSocket(io); // Mover esta línea aquí, después de configurar el WebSocket

const port = process.env.PORT || 8080; // Predeterminado a 8080 si no está definido

// Configuración de Handlebars
app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
        layoutsDir: path.join(rootDir, "src", "views", "layouts"),
    })
);
app.set("view engine", "handlebars");
app.set("views", path.join(rootDir, "src", "views"));

// Middlewares
app.use(morgan("dev"));
app.use(express.static(path.join(rootDir, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use("/", viewsRouter);
app.use("/", productsRouter);
app.use(errorHandler);
app.use(pathHandler);

// Iniciar el servidor
server.listen(port, () => console.log(`🚀 Server running on port ${port}`));

// Manejo de cierre del servidor
process.on("SIGINT", () => {
    console.log("🔴 Cierre detectado. Cerrando el servidor y WebSocket...");
    io.close(() => {
        console.log("✅ WebSocket cerrado.");
    });
    server.close(() => {
        console.log("✅ Servidor cerrado correctamente.");
        process.exit(0); // Termina el proceso después de cerrar correctamente
    });
});
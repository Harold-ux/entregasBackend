import { Router } from "express";
import { indexView } from "../controllers/views.controller.js";
import productsRouter from "./api/products.router.js";

// Creación del router
const router = Router();

// Middleware para todas las rutas

router.use("/products", productsRouter);

// Ruta para renderizar la vista de índice con productos
router.get("/", indexView);

export default router;
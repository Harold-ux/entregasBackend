import { Router } from "express";
import apiRouter from "./api/api.router.js";
import viewsRouter from "./views.router.js";
import productsRouter from "./api/products.router.js";

// Creación del router
const router = Router();

// Middleware para todas las rutas
router.use("/", viewsRouter);
router.use("/api", apiRouter);
router.use("/products", productsRouter);

// Ruta para renderizar la vista de índice con productos
router.get("/", async (req, res, next) => {
  try {
    const { limit = 9, page = 1, query } = req.query;
    const result = await productsRouter.get("/", { query: { limit, page, query } });

    return res.render("index", {
      products: result.docs,
      hasPrevPage: result.hasPrevPage,
      prevPage: result.prevPage,
      hasNextPage: result.hasNextPage,
      nextPage: result.nextPage,
      query: query || "",
      message: "Products loaded successfully",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
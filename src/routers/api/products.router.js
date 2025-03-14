import { Router } from "express";
import {
    create,
    deleteById,
    paginate,
    readById,
    updateById
} from "../../controllers/products.controller.js";
import isValidProduct from "../../middlewares/isValidProduct.mid.js";

const productsRouter = Router();

productsRouter.get("/", paginate);
productsRouter.get("/:product_id", readById);
productsRouter.post("/", isValidProduct, create);
productsRouter.put("/:pid", isValidProduct, updateById);
productsRouter.delete("/:pid", deleteById);

export default productsRouter;

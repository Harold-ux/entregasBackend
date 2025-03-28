import { Router } from "express";
import {
    create,
    deleteById,
    paginate,
    readById,
    updateById
} from "../../controllers/products.controller.js";
import isValidProduct from "../../middlewares/isValidProduct.mid.js";
import isValidObjectId from "../../middlewares/isValidObjectId.mid.js";

const productsRouter = Router();

productsRouter.get("/products", paginate);
productsRouter.post("/", isValidProduct, create);
productsRouter.get("/:product_id", isValidObjectId, readById);
productsRouter.put("/:product_id", isValidProduct, updateById);
productsRouter.delete("/:product_id", isValidObjectId, deleteById);

export default productsRouter;

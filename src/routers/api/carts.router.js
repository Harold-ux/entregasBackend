import { Router } from "express";
import { addProductToCart, readProductsFromUser , removeProductFromCart, updateQuantity } from "../../controllers/carts.controller.js";

const cartsRouter = Router();

cartsRouter.post("/", addProductToCart);
cartsRouter.get("/users/:user_id", readProductsFromUser );
cartsRouter.put("/:cart_id", updateQuantity);
cartsRouter.delete("/:cart_id", removeProductFromCart);

export default cartsRouter;
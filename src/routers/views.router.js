import { Router } from "express";
import { indexView, productView, cartView, profileView, socketView, realTimeProductsView } from "../controllers/views.controller.js";

const viewsRouter = Router();

// Routes for views
viewsRouter.get("/", indexView);
viewsRouter.get("/product/:pid", productView);
viewsRouter.get("/cart", cartView);
viewsRouter.get("/profile/:uid", profileView);
viewsRouter.get("/chat", socketView);
viewsRouter.get("/realtimeproducts", realTimeProductsView);

export default viewsRouter;

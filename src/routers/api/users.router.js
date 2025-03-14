import { Router } from "express";
import { create, read, readById, updateById, deleteById } from "../../controllers/users.controller.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";

const usersRouter = Router();

usersRouter.get("/", read);
usersRouter.post("/", isValidUser, create);
usersRouter.get("/:uid", readById);
usersRouter.put("/:uid", updateById);
usersRouter.delete("/:uid", deleteById);

export default usersRouter;

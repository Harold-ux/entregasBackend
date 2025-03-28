// src/middlewares/isValidObjectId.mid.js
import mongoose from "mongoose";

const isValidObjectId = (req, res, next) => {
  if (req.params.product_id) {
    const id = req.params.product_id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID no válido" });
    }
  }
  // Agregar un log para verificar el ID que se está validando
  console.log("Validando ID:", id);
  next();
};

export default isValidObjectId;
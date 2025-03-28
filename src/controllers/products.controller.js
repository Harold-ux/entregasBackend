import mongoose from "mongoose";
import productsManager from "../data/mongo/managers/products.mongo.js";

// Obtener todos los productos sin paginación
const read = async (req, res, next) => {
  try {
    const all = await productsManager.read({});
    return res.status(200).json({
      status: "success",
      method: req.method,
      url: req.url,
      response: all,
    });
  } catch (error) {
    next(error);
  }
};

// Obtener producto por ID
const readById = async (req, res, next) => {
  try {
    const { product_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    const product = await productsManager.readById(product_id);
    if (!product) {
      return res.status(404).render("product", { product: null });
    }
    return res.render("product", { product });
  } catch (error) {
    next(error);
  }
};

// Crear producto
const create = async (req, res, next) => {
  try {
    const { title, price, category, stock } = req.body;

    if (!title || !price || !category || stock === undefined) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const one = await productsManager.create(req.body);
    return res.status(201).json({
      status: "success",
      method: req.method,
      url: req.url,
      response: one,
    });
  } catch (error) {
    next(error);
  }
};

// Actualizar producto por ID
const updateById = async (req, res, next) => {
  try {
    const { product_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    const updatedProduct = await productsManager.updateById(
      product_id,
      req.body
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json({
      status: "success",
      method: req.method,
      url: req.url,
      response: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// Eliminar producto por ID
const deleteById = async (req, res, next) => {
  try {
    const { product_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    const deleted = await productsManager.destroyById(product_id);
    if (!deleted) {
      return res
        .status(404)
        .json({ error: `Producto con ID ${product_id} no encontrado` });
    }

    return res.status(200).json({
      status: "success",
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

// Paginación de productos
const paginate = async (req, res, next) => {
  try {
    const { page = 1, limit = 9, sort = "asc", query } = req.query;

    let filter = {};
    if (query && query !== "none") {
      filter = {
        category: { $regex: `^${query}$`, $options: "i" },
      };
    }

    // Agregar un log para verificar el filtro
    console.log("Filtro aplicado:", filter);

    const sortOrder = sort === "desc" ? -1 : 1;

    const options = {
      page: Number(page),
      limit: Number(limit),
      sort: { price: sortOrder },
    };

    const result = await productsManager.paginate(filter, options);

    if (!result || !result.docs.length) {
      return res.status(404).json({ error: "No se encontraron productos" });
    }

    return res.status(200).json({
      method: req.method,
      url: req.url,
      response: result,
    });
  } catch (error) {
    next(error);
  }
};

export { create, deleteById, paginate, read, readById, updateById };

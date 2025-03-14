import productsManager from "../data/mongo/managers/products.mongo.js";
import mongoose from "mongoose";

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
  const { product_id } = req.params;
  try {
    const product = await productsManager.readById(product_id); // Asegúrate de que esta función esté implementada
    if (!product) {
      return res.status(404).render("product", { product: null }); // Renderiza la vista con un producto nulo
    }
    return res.render("product", { product }); // Pasa el producto a la vista
  } catch (error) {
    next(error);
  }
};

// Crear producto
const create = async (req, res, next) => {
  try {
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
    const { pid } = req.params;
    const updatedProduct = await productsManager.updateById(pid, req.body);
    if (!updatedProduct) {
      const error = new Error("Producto no encontrado");
      error.statusCode = 404;
      throw error;
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
    const { pid } = req.params;
    const deleted = await productsManager.destroyById(pid);

    if (!deleted) {
      const error = new Error(`Producto con ID ${pid} no encontrado`);
      error.statusCode = 404;
      throw error;
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
    const limit = Math.max(1, Number(req.query.limit) || 9);
    const page = Math.max(1, Number(req.query.page) || 1);
    const sort = req.query.sort === "desc" ? -1 : 1;

    // Filtro a partir de query
    let filter = {};
    if (req.query.query) {
      if (req.query.query.includes(":")) {
        const [key, value] = req.query.query.split(":");
        if (key === "availability") {
          filter[key] = value === "true";
        } else {
          filter[key] = value;
        }
      } else {
        filter = { $or: [{ category: req.query.query }, { title: req.query.query }] };
      }
    }

    const options = {
      limit,
      page,
      sort: { price: sort },
      lean: true,
    };

    const result = await productsManager.read(filter);

    return res.status(200).json({
      status: "success",
      method: req.method,
      url: req.url,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};


export { read, create, readById, updateById, deleteById, paginate };

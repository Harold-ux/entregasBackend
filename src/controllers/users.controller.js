// import usersManager from "../data/fs/users.en.js";
import usersManager from "../data/mongo/managers/users.mongo.js";

// Get all products
const read = async (req, res, next) => {
  try {
    const filter = req.query;
    const all = await usersManager.read(filter);
    if (all.length > 0) {
      return res.status(200).json({
        method: req.method,
        url: req.url,
        response: all,
      });
    }
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};

// Get a product by ID
const readById = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.readById(uid);

    if (!one) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    return res
      .status(200)
      .json({ method: req.method, url: req.url, response: one });
  } catch (error) {
    next(error);
  }
};

// Create a product
const create = async (req, res, next) => {
  try {
    const one = await usersManager.create(req.body);
    return res
      .status(201)
      .json({ method: req.method, url: req.url, response: one });
  } catch (error) {
    next(error);
  }
};

// Update a product
const updateById = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const updatedProduct = await usersManager.updateById(uid, req.body);
    if (!updatedProduct) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
    }
    return res
      .status(200)
      .json({ method: req.method, url: req.url, response: updatedProduct });
  } catch (error) {
    next(error);
  }
};

// Delete a product
const deleteById = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const deleted = await usersManager.deleteById(uid);

    if (!deleted) {
      const err = new Error(`Product with ID ${pid} not found`);
      err.statusCode = 404;
      throw err;
    }

    return res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export { read, create, readById, updateById, deleteById };

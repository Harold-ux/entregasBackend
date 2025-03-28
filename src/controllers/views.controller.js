import productsManager from "../data/mongo/managers/products.mongo.js";

const indexView = async (req, res, next) => {
  try {
    console.log("Parámetros completos recibidos:", req.query); // Mostrar todos los parámetros

    const filter =
      req.query.query && req.query.query !== "none"
        ? { category: req.query.query }
        : {};
    // Agregar un log para verificar el filtro
    console.log("Filtro aplicado en la vista:", filter);
    const result = await productsManager.paginate(filter, {
      page: req.query.page || 1,
      limit: 9,
    });

    // Convertir _id a string y asegurarse de que los datos sean simples
    const products = result.docs.map((product) => ({
      _id: product._id.toString(), // Convertir a string
      title: product.title,
      price: product.price,
      stock: product.stock,
      photo: product.photo,
      category: product.category,
      availability: product.availability,
    }));

    // Pasar productos y otras variables de paginación a la vista
    return res.render("index", {
      products,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      currentPage: result.page,
      totalPages: result.totalPages,
      query: req.query.query || "", // Para que el query se pase a la vista
    });
  } catch (error) {
    next(error);
  }
};

// Controlador para la vista de productos

const productsView = async (req, res, next) => {
  try {
    const { page = 1, limit = 9, query } = req.query;

    let filter = {};
    if (query && query !== "none") {
      filter = { category: { $regex: `^${query}$`, $options: "i" } };
    }

    const options = {
      page: Number(page),
      limit: Number(limit),
    };

    const result = await productsManager.paginate(filter, options);

    // Formatear los productos para que coincidan con la vista index
    const products = result.docs.map((product) => ({
      _id: product._id.toString(), // Convertir _id a string
      title: product.title,
      price: product.price,
      stock: product.stock,
      photo: product.photo,
      category: product.category,
      availability: product.availability,
    }));

    return res.render("products", {
      title: "Lista de Productos",
      products, // Pasar la versión formateada
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      currentPage: result.page,
      totalPages: result.totalPages,
      query: query || "",
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    next(error);
  }
};


const productView = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsManager.readById(id);

    const data = {
      title: "Product Detail",
      product,
    };

    return res.status(200).render("product", data);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).render("product", {
        product: null,
      });
    }
    next(error);
  }
};

const cartView = (req, res, next) => {
  try {
    const data = {
      title: "Cart",
      message: "Welcome to the cart!",
    };
    return res.status(200).render("cart", data);
  } catch (error) {
    next(error);
  }
};

const profileView = (req, res, next) => {
  try {
    const data = {
      title: "Profile",
      message: "User data!",
    };
    res.status(200).render("profile", data);
  } catch (error) {
    next(error);
  }
};

const socketView = (req, res, next) => {
  try {
    const data = {
      title: "Chat",
      message: "Welcome to the real-time chat!",
    };
    res.status(200).render("socket", data);
  } catch (error) {
    next(error);
  }
};

export const realTimeProductsView = async (req, res) => {
  const products = await productsManager.read();
  res.render("realTimeProducts", { title: "Real-Time Products", products });
};

export {
  indexView,
  productView,
  productsView,
  profileView,
  socketView,
  cartView,
};

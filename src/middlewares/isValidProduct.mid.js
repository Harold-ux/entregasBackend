const isValidProduct = (req, res, next) => {
    try {
      const { title, price, stock, category } = req.body;
      const isUpdate = req.method === 'PUT'; // Verifica si es una actualización
  
      // Si es creación, asegurarse de que todos los campos estén presentes
      if (!isUpdate) {
        if (!title) {
          const error = new Error("Missing necessary data: (title)");
          error.httpStatus = 400;
          throw error;
        }
        if (!price) {
          const error = new Error("Missing necessary data: (price)");
          error.httpStatus = 400;
          throw error;
        }
        if (!stock) {
          const error = new Error("Missing necessary data: (stock)");
          error.httpStatus = 400;
          throw error;
        }
        if (!category) {
          const error = new Error("Missing necessary data: (category)");
          error.httpStatus = 400;
          throw error;
        }
      }
  
      // Para actualización, solo validar los campos que están presentes
      if (title && typeof title !== "string") {
        const error = new Error("Invalid data type: (title should be a string)");
        error.httpStatus = 400;
        throw error;
      }
      if (price && typeof price !== "number") {
        const error = new Error("Invalid data type: (price should be a number)");
        error.httpStatus = 400;
        throw error;
      }
      if (stock && typeof stock !== "number") {
        const error = new Error("Invalid data type: (stock should be a number)");
        error.httpStatus = 400;
        throw error;
      }
      if (category && typeof category !== "string") {
        const error = new Error("Invalid data type: (category should be a string)");
        error.httpStatus = 400;
        throw error;
      }
  
      next();
    } catch (error) {
      next(error);
    }
  };
  
  export default isValidProduct;
  
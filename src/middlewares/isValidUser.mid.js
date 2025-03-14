// middlewares/validateUser.js
const isValidUser = (req, res, next) => {
    try {
      const { age, name, email, password } = req.body;
  
      // Validación de los campos requeridos
      if (!age) {
        const error = new Error("Missing necessary data: (age)");
        error.httpStatus = 400;
        throw error;
      }
      if (!name) {
        const error = new Error("Missing necessary data: (name)");
        error.httpStatus = 400;
        throw error;
      }
      if (!email) {
        const error = new Error("Missing necessary data: (email)");
        error.httpStatus = 400;
        throw error;
      }
      if (!password) {
        const error = new Error("Missing necessary data: (password)");
        error.httpStatus = 400;
        throw error;
      }
  
      // Validación de tipos
      if (typeof age !== "number") {
        const error = new Error("Invalid data type: (age should be a number)");
        error.httpStatus = 400;
        throw error;
      }
      if (typeof name !== "string") {
        const error = new Error("Invalid data type: (name should be a string)");
        error.httpStatus = 400;
        throw error;
      }
      if (typeof email !== "string") {
        const error = new Error("Invalid data type: (email should be a string)");
        error.httpStatus = 400;
        throw error;
      }
      if (typeof password !== "string") {
        const error = new Error("Invalid data type: (password should be a string)");
        error.httpStatus = 400;
        throw error;
      }
  
      next();
    } catch (error) {
      next(error);
    }
  };
  
  export default isValidUser;
  
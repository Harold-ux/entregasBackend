const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  console.error(err.stack);  // Usar * solo en desarrollo, para no exponerlo en producción

  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({
    method: req.method,
    url: req.url,
    error: message,
  });
};

export default errorHandler;
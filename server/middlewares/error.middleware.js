// server/middleware/error.middleware.js

export const errorMiddleware = (err, req, res, next) => {
  // Agar statusCode define nahi hai to 500 default
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: true,
    message: err.message || "Something went wrong",
  });
};

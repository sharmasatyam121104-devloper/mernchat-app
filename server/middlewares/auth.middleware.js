import jwt from "jsonwebtoken";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import ErrorHandler from "../utilities/errorHandler.utility.js";

export const isAuthentication = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.replace("Bearer", "");

  if (!token) {
    return next(new ErrorHandler("Invalid token", 400));
  }

  const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = tokenData?._id;
  next();
});

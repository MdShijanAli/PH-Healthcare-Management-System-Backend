import { NextFunction, Request, Response } from "express";
import { envVers } from "../../config/env";
import status from "http-status";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envVers.NODE_ENV === "development") {
    console.error("Error from Global Error Handler:", err);
  }

  let statusCode: number = status.INTERNAL_SERVER_ERROR; // Default to 500
  let message: string = "Internal Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
  } else if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Unauthorized";
  } else if (err.name === "NotFoundError") {
    statusCode = 404;
    message = "Resource Not Found";
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    error: err.message || "Something went wrong!",
  });
};

import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const registerPatiend = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const result = await authService.registerPatient({
    name,
    email,
    password,
  });

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Patient registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.loginUser({
    email,
    password,
  });
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export const authController = {
  registerPatiend,
  loginUser,
};

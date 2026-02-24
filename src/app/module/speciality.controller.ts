import { Request, Response } from "express";
import { SpecialityService } from "./speciality.service";
import { catchAsync } from "../shared/catchAsync";
import { sendResponse } from "../shared/sendResponse";

const createSpeciality = catchAsync(async (req: Request, res: Response) => {
  const speciality = await SpecialityService.createSpeciality(req.body);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Speciality created successfully",
    data: speciality,
  });
});

const getAllSpecialities = catchAsync(async (req: Request, res: Response) => {
  const specialities = await SpecialityService.getAllSpecialities();
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Specialities retrieved successfully",
    data: specialities,
  });
});

const getSpecialityById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const speciality = await SpecialityService.getSpecialityById(id as string);
  if (speciality) {
    sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: "Speciality retrieved successfully",
      data: speciality,
    });
  } else {
    sendResponse(res, {
      httpStatusCode: 404,
      success: false,
      message: "Speciality not found",
    });
  }
});

const updateSpeciality = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const speciality = await SpecialityService.updateSpeciality(
    id as string,
    req.body,
  );
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Speciality updated successfully",
    data: speciality,
  });
});

const deleteSpeciality = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const speciality = await SpecialityService.deleteSpeciality(id as string);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Speciality deleted successfully",
    data: speciality,
  });
});

export const SpecialityController = {
  createSpeciality,
  getAllSpecialities,
  getSpecialityById,
  updateSpeciality,
  deleteSpeciality,
};

import { Request, Response } from "express";
import { SpecialityService } from "./speciality.service";

const createSpeciality = async (req: Request, res: Response) => {
  try {
    const speciality = await SpecialityService.createSpeciality(req.body);
    res.status(201).json({
      success: true,
      message: "Speciality created successfully",
      data: speciality,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create speciality",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getAllSpecialities = async (req: Request, res: Response) => {
  try {
    const specialities = await SpecialityService.getAllSpecialities();
    res.status(200).json({
      success: true,
      message: "Specialities retrieved successfully",
      data: specialities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve specialities",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getSpecialityById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const speciality = await SpecialityService.getSpecialityById(id);
    if (speciality) {
      res.status(200).json({
        success: true,
        message: "Speciality retrieved successfully",
        data: speciality,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Speciality not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve speciality",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const updateSpeciality = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const speciality = await SpecialityService.updateSpeciality(id, req.body);
    res.status(200).json({
      success: true,
      message: "Speciality updated successfully",
      data: speciality,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update speciality",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const deleteSpeciality = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const speciality = await SpecialityService.deleteSpeciality(id);
    res.status(200).json({
      success: true,
      message: "Speciality deleted successfully",
      data: speciality,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete speciality",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const SpecialityController = {
  createSpeciality,
  getAllSpecialities,
  getSpecialityById,
  updateSpeciality,
  deleteSpeciality,
};

import { Role, Speciality } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ICreateDoctorPayload } from "./user.interface";

const createDoctor = async (payload: ICreateDoctorPayload) => {
  const specialities: Speciality[] = [];

  for (const specialityId of payload.specialities) {
    const speciality = await prisma.speciality.findUnique({
      where: { id: specialityId },
    });
    if (!speciality) {
      throw new Error(`Speciality with ID ${specialityId} not found`);
    }
    specialities.push(speciality);
  }

  const userExists = await prisma.user.findUnique({
    where: { email: payload.doctor.email },
  });

  if (userExists) {
    throw new Error("User with this email already exists");
  }

  const userData = await auth.api.signUpEmail({
    body: {
      email: payload.doctor.email,
      password: payload.password,
      role: Role.DOCTOR,
      name: payload.doctor.name,
      needPasswordChange: true,
    },
  });

  try {
    const result = await prisma.$transaction(async (tx) => {
      const doctorData = await tx.doctor.create({
        data: {
          userId: userData.user.id,
          ...payload.doctor,
        },
      });

      const doctorSpecilityData = specialities.map((speciality) => ({
        doctorId: doctorData.id,
        specialityId: speciality.id,
      }));

      await tx.doctorSpeciality.createMany({
        data: doctorSpecilityData,
      });

      const doctor = await tx.doctor.findUnique({
        where: { id: doctorData.id },
        select: {
          id: true,
          name: true,
          email: true,
          profilePhoto: true,
          contactNumber: true,
          address: true,
          registrationNumber: true,
          experience: true,
          gender: true,
          appointmentFee: true,
          qualification: true,
          currentWorkingPlace: true,
          designation: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              status: true,
              emailVerified: true,
              createdAt: true,
              updatedAt: true,
              image: true,
              isDeleted: true,
              deletedAt: true,
            },
          },
          specialities: {
            select: {
              speciality: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      });
      return doctor;
    });
  } catch (error) {
    console.error("Error creating doctor:", error);
    await prisma.user.delete({ where: { id: userData.user.id } });
    throw new Error("Failed to create doctor");
  }
};

export const UserService = {
  createDoctor,
};

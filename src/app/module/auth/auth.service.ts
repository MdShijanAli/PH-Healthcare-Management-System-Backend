import { UserStatus } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

interface IRegisterPatient {
  name: string;
  email: string;
  password: string;
}

const registerPatient = async (payload: IRegisterPatient) => {
  const { name, email, password } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      // Default values for other fields
      // needPaswordChange: false,
      // role: Role.PATIENT,
    },
  });

  if (!data.user) {
    throw new Error("User registration failed");
  }

  try {
    const patient = await prisma.$transaction(async (tx) => {
      const patientTx = await tx.patient.create({
        data: {
          userId: data.user.id,
          name: payload.name,
          email: payload.email,
        },
      });

      return patientTx;
    });

    return { ...data, patient };
  } catch (error) {
    console.error("Error during patient registration transaction:", error);
    await prisma.user.delete({
      where: {
        id: data.user.id,
      },
    });
    throw new Error("Patient registration failed: " + error);
  }
};

interface ILoginUserPayload {
  email: string;
  password: string;
}

const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (!data.user) {
    throw new Error("User login failed");
  }

  if (data.user.status === UserStatus.BLOCKED) {
    throw new Error("User is blocked. Please contact support.");
  }

  if (data.user.status === UserStatus.DELETED || data.user.isDeleted) {
    throw new Error("User is deleted.");
  }

  return data;
};

export const authService = {
  registerPatient,
  loginUser,
};

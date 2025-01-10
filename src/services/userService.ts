import { CreateUserParams } from "../interfaces/usersInterface";
import prisma from "../prisma";

export const extingUser = async (email: string) => {
  const extingUser = await prisma.users.findUnique({
    where: { email },
  });

  return extingUser;
};

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  const result = await prisma.users.create({
    data: {
      name,
      email,
      password,
    },
  });

  return result;
};

export const editUser = async (
  id: number,
  { name, email, password }: CreateUserParams
) => {
  const result = await prisma.users.update({
    where: { id },
    data: {
      name,
      email,
      password,
    },
  });

  return result;
};

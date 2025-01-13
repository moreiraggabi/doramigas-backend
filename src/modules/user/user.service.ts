import {
  IncorrectPasswordException,
  UserNotFoundException,
} from './user.excepetions';
import { encriptPassword } from './users.helper';
import { CreateUserParams } from './users.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma';

export const extingUser = async (email: string) => {
  const extingUser = await prisma.user.findUnique({
    where: { email },
  });

  return extingUser;
};

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  const userResult = await extingUser(email);
  if (userResult) {
    throw new UserNotFoundException('O e-mail informado já está cadastrado');
  }

  const hashedPassword = await encriptPassword(password);

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return result;
};

export const loginUser = async (email: string, password: string) => {
  const userResult = await extingUser(email);
  if (!userResult) {
    throw new UserNotFoundException('Usuário não encontrado');
  }

  const user = userResult;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new IncorrectPasswordException('A senha informada está incorreta');
  }

  //Gerar token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '48h' },
  );

  return token;
};

export const editUser = async (
  id: number,
  { name, email, password }: CreateUserParams,
) => {
  const idExist = await prisma.user.findUnique({
    select: { id: true },
    where: { id },
  });

  if (!idExist) {
    throw new UserNotFoundException('Id não encontrado');
  }

  if (email) {
    const emailExist = await extingUser(email);
    if (emailExist) {
      throw new UserNotFoundException('O e-mail informado já está em uso');
    }
  }

  let hashedPassword;
  if (password) {
    hashedPassword = await encriptPassword(password);
  }

  const result = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return result;
};

export const listUsers = async () => {
  const result = prisma.user.findMany({
    select: { name: true, email: true, created_at: true },
  });

  return result;
};

export const listUserById = async (id: number) => {
  const result = prisma.user.findUnique({
    where: { id },
    select: { name: true, email: true, created_at: true },
  });

  return result;
};

export const deleteUser = async (id: number) => {
  const result = prisma.user.delete({
    where: { id },
  });

  return result;
};

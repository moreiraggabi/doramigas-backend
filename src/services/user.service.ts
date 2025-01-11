import {
  IncorrectPasswordException,
  UserNotFoundException,
} from '../exceptions/userExcepetions';
import { encriptPassword } from '../helpers/usersHelper';
import { CreateUserParams } from '../interfaces/users.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';

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
  const userResult = await extingUser(email);
  if (!userResult) {
    throw new UserNotFoundException('E-mail não cadastrado');
  }

  const hashedPassword = await encriptPassword(password);

  const result = await prisma.users.create({
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
  const idExist = await prisma.users.findUnique({
    select: { id: true },
    where: { id },
  });

  if (!idExist) {
    throw new UserNotFoundException('Id não encontrado');
  }

  const emailExist = await extingUser(email);
  if (emailExist) {
    throw new UserNotFoundException('O e-mail informado já está em uso');
  }

  const hashedPassword = await encriptPassword(password);

  const result = await prisma.users.update({
    where: { id },
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return result;
};

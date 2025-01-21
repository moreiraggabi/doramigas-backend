import prisma from '../../prisma';
import { GenreExistiException } from './genre.exceptions';
import { CreateGenreParams } from './genre.interface';

export const checkIfGenreExist = async (name: string) => {
  return await prisma.genre.findUnique({
    where: { name },
  });
};

export const createGenre = async (params: CreateGenreParams) => {
  const { name, description } = params;
  const genreExist = await checkIfGenreExist(name);

  if (genreExist) {
    throw new GenreExistiException(
      'Já existe um gênero cadastrado com esse nome!',
    );
  }
  return await prisma.genre.create({
    data: {
      name,
      description,
    },
  });
};

export const editGenre = async (
  id: number,
  { name, description }: Partial<CreateGenreParams>,
) => {
  if (name) {
    const genreExist = await checkIfGenreExist(name);

    if (genreExist) {
      throw new GenreExistiException(
        'Já existe um gênero cadastrado com esse nome!',
      );
    }
  }

  return await prisma.genre.update({
    where: { id },
    data: {
      name,
      description,
    },
  });
};

export const deleteGenre = async (id: number) => {
  return await prisma.genre.delete({
    where: { id },
  });
};

export const listAll = async () => {
  return await prisma.genre.findMany();
};

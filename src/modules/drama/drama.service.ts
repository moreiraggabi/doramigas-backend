import prisma from '../../prisma';
import { CreateDramaParams } from './drama.interface';

export const createDrama = async ({
  name,
  synopsis,
  nationality,
  platform,
}: CreateDramaParams) => {
  const result = await prisma.drama.create({
    data: {
      name,
      synopsis,
      nationality,
      platform,
    },
  });

  return result;
};

export const listDramas = async () => {
  const result = await prisma.drama.findMany({
    include: {
      genreDrama: {
        select: {
          genre: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const transformedResult = result.map((drama) => {
    const genres = drama.genreDrama.map((gd) => gd.genre.name);

    return {
      id: drama.id,
      name: drama.name,
      synopsis: drama.synopsis,
      genres,
      nationality: drama.nationality,
      platform: drama.platform,
    };
  });

  return transformedResult;
};

export const getDramasById = async (id: number) => {
  const result = await prisma.drama.findUnique({
    where: { id },
  });

  return result;
};

export const editDrama = async (
  id: number,
  { name, synopsis, nationality, platform }: Partial<CreateDramaParams>,
) => {
  const result = await prisma.drama.update({
    where: { id },
    data: {
      name,
      synopsis,
      nationality,
      platform,
    },
  });

  return result;
};

export const deleteDrama = async (id: number) => {
  const result = await prisma.drama.delete({
    where: { id },
  });

  return result;
};

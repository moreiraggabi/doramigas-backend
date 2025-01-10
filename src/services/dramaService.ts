import prisma from "../prisma";
import { CreateDramaParams } from "../interfaces/dramaInterface";

export const createDrama = async ({
  name,
  synopsis,
  genre,
  nationality,
  platform,
}: CreateDramaParams) => {
  const result = await prisma.dramas.create({
    data: {
      name,
      synopsis,
      genre,
      nationality,
      platform,
    },
  });

  return result;
};

export const listDramas = async () => {
  const result = await prisma.dramas.findMany();

  return result;
};

export const getDramasById = async (id: number) => {
  const result = await prisma.dramas.findUnique({
    where: { id },
  });

  return result;
};

export const editDrama = async (
  id: number,
  { name, synopsis, genre, nationality, platform }: Partial<CreateDramaParams>
) => {
  const result = await prisma.dramas.update({
    where: { id },
    data: {
      name,
      synopsis,
      genre,
      nationality,
      platform,
    },
  });

  return result;
};

export const deleteDrama = async (id: number) => {
  const result = await prisma.dramas.delete({
    where: { id }
  });

  return result;
}

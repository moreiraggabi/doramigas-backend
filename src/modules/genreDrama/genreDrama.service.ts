import prisma from '../../prisma';
import { GenreDramaRelationException } from './genreDrama.exceptions';

export const addGenreToDrama = async (dramaId: number, genreId: number) => {
  const existingRecord = await prisma.genreDrama.findFirst({
    where: { genreId, dramaId },
  });

  if (existingRecord) {
    throw new GenreDramaRelationException(
      'Já existe um relacionamento criado entre esse dorama e gênero',
    );
  } else {
    return await prisma.genreDrama.create({
      data: {
        genreId,
        dramaId,
      },
    });
  }
};

export const deleteGenreOfDrama = async (dramaId: number, genreId: number) => {
  const existingRecord = await prisma.genreDrama.findFirst({
    where: { genreId, dramaId },
  });

  if (!existingRecord) {
    throw new GenreDramaRelationException(
      'Este relacionamento entre dorama e gênero não existe',
    );
  } else {
    return await prisma.genreDrama.delete({
      where: { id: existingRecord.id },
    });
  }
};

export const listGenresByDrama = async (dramaId: number) => {
  const genresIdsRaw = await prisma.genreDrama.findMany({
    select: { genreId: true },
    where: { dramaId },
  });

  const genresIds = genresIdsRaw.map((record) => record.genreId);

  return await prisma.genre.findMany({
    where: { id: { in: genresIds } },
  });
};

export const listDramasByGenre = async (genreId: number) => {
  const dramasIdsRaw = await prisma.genreDrama.findMany({
    select: { dramaId: true },
    where: { genreId },
  });

  const dramasIds = dramasIdsRaw.map((record) => record.dramaId);

  return await prisma.drama.findMany({
    where: { id: { in: dramasIds } },
  });
};

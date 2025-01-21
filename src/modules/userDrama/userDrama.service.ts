import prisma from '../../prisma';
import { FilterOptions } from './userDrama.interface';

export const toggleFavoriteDrama = async (userId: number, dramaId: number) => {
  const existingRecord = await prisma.userDrama.findFirst({
    where: { userId, dramaId },
  });

  if (existingRecord) {
    return await prisma.userDrama.update({
      where: { id: existingRecord.id },
      data: { isFavorite: !existingRecord.isFavorite },
    });
  } else {
    return await prisma.userDrama.create({
      data: {
        userId,
        dramaId,
        isFavorite: true,
      },
    });
  }
};

export const toggleDroppedDrama = async (userId: number, dramaId: number) => {
  const existingRecord = await prisma.userDrama.findFirst({
    where: { userId, dramaId },
  });

  if (existingRecord) {
    return await prisma.userDrama.update({
      where: { id: existingRecord.id },
      data: { isDropped: !existingRecord.isDropped },
    });
  } else {
    return await prisma.userDrama.create({
      data: {
        userId,
        dramaId,
        isDropped: true,
      },
    });
  }
};

export const toggleIsWatching = async (userId: number, dramaId: number) => {
  const existingRecord = await prisma.userDrama.findFirst({
    where: { userId, dramaId },
  });

  if (existingRecord) {
    return await prisma.userDrama.update({
      where: { id: existingRecord.id },
      data: { isWatching: !existingRecord.isWatching },
    });
  } else {
    return await prisma.userDrama.create({
      data: {
        userId,
        dramaId,
        isWatching: true,
      },
    });
  }
};

export const toggleIsWatched = async (userId: number, dramaId: number) => {
  const existingRecord = await prisma.userDrama.findFirst({
    where: { userId, dramaId },
  });

  if (existingRecord) {
    return await prisma.userDrama.update({
      where: { id: existingRecord.id },
      data: { isWatched: !existingRecord.isWatched },
    });
  } else {
    return await prisma.userDrama.create({
      data: {
        userId,
        dramaId,
        isWatched: true,
      },
    });
  }
};

export const ratingDrama = async (
  userId: number,
  dramaId: number,
  rating: number,
) => {
  const existingRecord = await prisma.userDrama.findFirst({
    where: { userId, dramaId },
  });

  if (existingRecord) {
    return await prisma.userDrama.update({
      where: { id: existingRecord.id },
      data: { rating },
    });
  } else {
    return await prisma.userDrama.create({
      data: {
        userId,
        dramaId,
        rating,
      },
    });
  }
};

export const listDramasByUser = async (userId: number) => {
  const userDramaIdsRaw = await prisma.userDrama.findMany({
    select: { dramaId: true },
    where: {
      AND: [
        { userId },
        {
          OR: [
            { isDropped: true },
            { isFavorite: true },
            { isWatching: true },
            { isWatched: true },
            { rating: { not: null } },
          ],
        },
      ],
    },
  });

  const userDramaIds = userDramaIdsRaw.map((record) => record.dramaId);

  const dramaList = await prisma.drama.findMany({
    where: {
      id: { in: userDramaIds },
    },
    include: {
      userDrama: {
        where: {
          userId,
        },
        select: {
          isFavorite: true,
          isDropped: true,
          isWatching: true,
          isWatched: true,
          rating: true,
        },
      },
    },
  });

  const formattedDramaList = dramaList.map((drama) => {
    const userDrama = drama.userDrama[0] || {};
    return {
      id: drama.id,
      name: drama.name,
      isFavorite: userDrama.isFavorite,
      isDropped: userDrama.isDropped,
      isWatching: userDrama.isWatching,
      isWatched: userDrama.isWatched,
      rating: userDrama.rating,
    };
  });

  return formattedDramaList;
};

export const listFavoriteDramasByUser = async (userId: number) => {
  const dramasIdsRaw = await prisma.userDrama.findMany({
    select: { dramaId: true },
    where: { userId, isFavorite: true },
  });

  const dramasIds = dramasIdsRaw.map((record) => record.dramaId);

  const userFavoriteDramas = await prisma.drama.findMany({
    where: { id: { in: dramasIds } },
  });

  return userFavoriteDramas;
};

export const listWatchedDramasByUser = async (userId: number) => {
  const dramasIdsRaw = await prisma.userDrama.findMany({
    select: { dramaId: true },
    where: { userId, isWatched: true },
  });

  const dramasIds = dramasIdsRaw.map((record) => record.dramaId);

  const userWatchedDramas = await prisma.drama.findMany({
    where: { id: { in: dramasIds } },
  });

  return userWatchedDramas;
};

export const listDroppedDramasByUser = async (userId: number) => {
  const dramasIdsRaw = await prisma.userDrama.findMany({
    select: { dramaId: true },
    where: { userId, isDropped: true },
  });

  const dramasIds = dramasIdsRaw.map((record) => record.dramaId);

  const userDroppedDramas = await prisma.drama.findMany({
    where: { id: { in: dramasIds } },
  });

  return userDroppedDramas;
};

export const getFilteredDramasByUser = async (filters: FilterOptions) => {
  const { userId } = filters;

  const validFiltersArray = Object.entries(filters)
    .filter(
      ([key, value]) =>
        value !== undefined && value !== null && key !== 'userId',
    )
    .map(([key, value]) => ({ [key]: value }));

  const dramasIdsRaw = await prisma.userDrama.findMany({
    select: { dramaId: true },
    where: {
      AND: [
        { userId },
        {
          OR: validFiltersArray,
        },
      ],
    },
  });

  const dramasIds = dramasIdsRaw.map((record) => record.dramaId);

  const filteredDramas = await prisma.drama.findMany({
    where: { id: { in: dramasIds } },
    include: {
      userDrama: {
        where: { userId },
        select: {
          isFavorite: true,
          isDropped: true,
          isWatching: true,
          isWatched: true,
          rating: true,
        },
      },
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

  const transformedFilteredDramas = filteredDramas.map((drama) => {
    const userDrama = drama.userDrama[0] || {};
    const genres = drama.genreDrama.map((gd) => gd.genre.name);

    return {
      id: drama.id,
      name: drama.name,
      isFavorite: userDrama.isFavorite || false,
      isDropped: userDrama.isDropped || false,
      isWatching: userDrama.isWatching || false,
      isWatched: userDrama.isWatched || false,
      rating: userDrama.rating || null,
      genres,
    };
  });

  return transformedFilteredDramas;
};

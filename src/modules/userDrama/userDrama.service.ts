import prisma from '../../prisma';

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

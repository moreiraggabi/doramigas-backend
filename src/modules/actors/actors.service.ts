import prisma from '../../prisma';
import { CreateActorParams } from './actors.interface';

export const createActor = async ({ name, photo }: CreateActorParams) => {
  return await prisma.actor.create({
    data: { name, photo },
  });
};

export const editActor = async (
  id: number,
  { name, photo }: CreateActorParams,
) => {
  return await prisma.actor.update({
    where: { id },
    data: { name, photo },
  });
};

export const listActors = async () => {
  return await prisma.actor.findMany({});
};

export const deleteActor = async (id: number) => {
  return await prisma.actor.delete({
    where: { id },
  });
};

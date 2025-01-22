import { Request, Response } from 'express';
import {
  createActor,
  deleteActor,
  editActor,
  listActors,
} from './actors.service';
import { errorMessages } from '../../utils/errorMessages';

export const createActorHandler = async (req: Request, res: Response) => {
  const { name, photo } = req.body;

  if (!name) {
    return res.status(400).json({ errors: 'É obrigatório informar um nome' });
  }

  try {
    const result = createActor({ name, photo });

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ errors: 'Ocorreu um erro ao cadastrar o ator/a atriz' });
  }
};

export const editActorHandler = async (req: Request, res: Response) => {
  const { name, photo } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ errors: errorMessages.idRequired });
  }

  try {
    const result = editActor(+id, { name, photo });

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);

    return res
      .status(500)
      .json({ errors: 'Ocorreu um erro ao editar o ator/a atriz' });
  }
};

export const listActorsHandler = async (req: Request, res: Response) => {
  try {
    const result = listActors();

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);

    return res
      .status(500)
      .json({ errors: 'Ocorreu um erro ao listar atores e atrizes' });
  }
};

export const deleteActorHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ errors: errorMessages.idRequired });
  }

  try {
    const result = deleteActor(+id);

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);

    return res
      .status(500)
      .json({ errors: 'Ocorreu um erro ao deletar o ator/a atriz' });
  }
};

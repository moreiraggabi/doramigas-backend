import { Request, Response } from 'express';
import { createGenre, deleteGenre, editGenre, listAll } from './genre.service';
import { GenreExistiException } from './genre.exceptions';
import { errorMessages } from '../../utils/errorMessages';

export const createGenreHandler = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ errors: 'O nome do gênero é obrigatório' });
  }

  try {
    const result = await createGenre({ name, description });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    if (err instanceof GenreExistiException) {
      return res.status(500).json({ error: err.message });
    } else {
      res.status(500).json('Ocorreu um erro ao cadastrar o gênero');
    }
  }
};

export const editGenreHandler = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ errors: errorMessages.idRequired });
  }

  try {
    const result = await editGenre(+id, { name, description });

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    if (err instanceof GenreExistiException) {
      return res.status(500).json({ error: err.message });
    } else {
      res.status(500).json('Ocorreu um erro ao editar o gênero');
    }
  }
};

export const deleteGenreHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: errorMessages.idRequired });
  }

  try {
    const result = await deleteGenre(+id);

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

export const listAllHandler = async (req: Request, res: Response) => {
  try {
    const result = await listAll();

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

import { Request, Response } from 'express';
import {
  listDramasByGenre,
  listGenresByDrama,
  addGenreToDrama,
  deleteGenreOfDrama,
} from './genreDrama.service';
import { GenreDramaRelationException } from './genreDrama.exceptions';

export const addGenreToDramaHandler = async (req: Request, res: Response) => {
  const { genreId, dramaId } = req.body;

  if (!genreId || !dramaId) {
    res
      .status(400)
      .json({ errors: 'É obrigatório informar os ids do dorama e do gênero' });
  }

  try {
    const result = await addGenreToDrama(+dramaId, genreId);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    if (err instanceof GenreDramaRelationException) {
      res.status(500).json(err.message);
    } else {
      res
        .status(500)
        .json({ errors: 'Ocorreu um erro ao adicionar o gênero ao dorama' });
    }
  }
};

export const deleteGenreOfDramaHandler = async (
  req: Request,
  res: Response,
) => {
  const { genreId } = req.body;
  const { dramaId } = req.params;

  if (!genreId || !dramaId) {
    res
      .status(400)
      .json({ errors: 'É obrigatório informar os ids do dorama e do gênero' });
  }

  try {
    const result = await deleteGenreOfDrama(+dramaId, genreId);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

export const listGenresByDramaHandler = async (req: Request, res: Response) => {
  const { dramaId } = req.params;

  if (!dramaId) {
    res.status(400).json({ errors: 'É obrigatório informar o id do dorama' });
  }

  try {
    const result = await listGenresByDrama(+dramaId);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

export const listDramasByGenreHandler = async (req: Request, res: Response) => {
  const { genreId } = req.params;

  if (!genreId) {
    res.status(400).json({ errors: 'É obrigatório informar o id do gênero' });
  }

  try {
    const result = await listDramasByGenre(+genreId);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

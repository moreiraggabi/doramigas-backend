import { Request, Response } from 'express';
import {
  listDramasByUser,
  listDroppedDramasByUser,
  listFavoriteDramasByUser,
  listWatchedDramasByUser,
  ratingDrama,
  toggleDroppedDrama,
  toggleFavoriteDrama,
  toggleIsWatched,
  toggleIsWatching,
} from './userDrama.service';
import { errorMessages } from '../../utils/errorMessages';

export const toggleFavoriteDramaHandler = async (
  req: Request,
  res: Response,
) => {
  const userId = req.user?.id;
  const { dramaId } = req.params;

  try {
    if (!userId || !dramaId) {
      return res.status(400).json({
        error: errorMessages.userIdAndDramaIdRequired,
      });
    }
    const result = await toggleFavoriteDrama(userId, +dramaId);
    return res.status(200).json({ result });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Ocorreu um erro ao favoritar o dorama' });
  }
};

export const toggleDroppedDramaHandler = async (
  req: Request,
  res: Response,
) => {
  const userId = req.user?.id;
  const { dramaId } = req.params;

  try {
    if (!userId || !dramaId) {
      return res
        .status(400)
        .json({ error: errorMessages.userIdAndDramaIdRequired });
    }

    const result = await toggleDroppedDrama(userId, +dramaId);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Ocorreu um erro ao marcar o dorama como dropado' });
  }
};

export const toggleIsWatchingHandler = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { dramaId } = req.params;

  try {
    if (!userId || !dramaId) {
      return res
        .status(400)
        .json({ error: errorMessages.userIdAndDramaIdRequired });
    }

    const result = await toggleIsWatching(userId, +dramaId);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);

    return res
      .status(500)
      .json({ error: 'Ocorreu um erro ao marcar o dorama como assistindo' });
  }
};

export const toggleIsWatchedHandler = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { dramaId } = req.params;

  try {
    if (!userId || !dramaId) {
      return res
        .status(400)
        .json({ error: errorMessages.userIdAndDramaIdRequired });
    }

    const result = await toggleIsWatched(userId, +dramaId);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);

    return res
      .status(500)
      .json({ error: 'Ocorreu um erro ao marcar o dorama como assistido' });
  }
};

export const ratingDramaHandler = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { dramaId } = req.params;
  const { rating } = req.body;

  try {
    if (!userId || !dramaId) {
      return res
        .status(400)
        .json({ error: errorMessages.userIdAndDramaIdRequired });
    }

    const result = await ratingDrama(userId, +dramaId, rating);
    return res.status(204).json(result);
  } catch (err) {
    console.error(err);

    return res
      .status(500)
      .json({ error: 'Ocorreu um erro ao avaliar o dorama' });
  }
};

export const listDramasByUserHandler = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ error: errorMessages.userIdRequired });
  }

  try {
    const result = await listDramasByUser(+userId);

    if (!result) {
      return res.status(404).json({
        error: 'Não foram encontrados nenhum dorama para este usuário',
      });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ error: 'Ocorreu um erro ao listar os doramas deste usuário' });
  }
};

export const listFavoriteDramasByUserHandler = async (
  req: Request,
  res: Response,
) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ error: errorMessages.userIdRequired });
  }

  try {
    const result = await listFavoriteDramasByUser(userId);

    if (!result) {
      return res.status(404).json({
        error: 'Não foram encontrados doramas favoritos para este usuário',
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: 'Ocorreu um erro ao pesquisar os doramas favoritos deste usuário.',
    });
  }
};

export const listWatchedDramasByUserHandler = async (
  req: Request,
  res: Response,
) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ error: errorMessages.userIdRequired });
  }

  try {
    const result = listWatchedDramasByUser(userId);

    if (!result) {
      return res.status(404).json({
        error: 'Não foram encontrados doramas assistidos por este usuário',
      });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ error: 'Ocorreu um erro ao buscar os doramas assistidos' });
  }
};

export const listDroppedDramasByUserHandler = async (
  req: Request,
  res: Response,
) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ error: errorMessages.userIdRequired });
  }

  try {
    const result = listDroppedDramasByUser(userId);

    if (!result) {
      return res.status(404).json({
        error: 'Não foram encontrados doramas dropados por este usuário',
      });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ error: 'Ocorreu um erro ao buscar os doramas dropados' });
  }
};

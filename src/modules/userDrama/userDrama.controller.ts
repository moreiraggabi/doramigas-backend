import { Request, Response } from 'express';
import {
  ratingDrama,
  toggleDroppedDrama,
  toggleFavoriteDrama,
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
    return res.status(204).json(result);
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
    return res.status(204).json(result);
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
    return res.status(204).json(result);
  } catch (err) {
    console.error(err);

    return res
      .status(500)
      .json({ error: 'Ocorreu um erro ao marcar o dorama como assistindo' });
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

import { Router } from 'express';
import { authenticateToken } from '../user/auth.middleware';
import {
  addGenreToDramaHandler,
  deleteGenreOfDramaHandler,
  listDramasByGenreHandler,
  listGenresByDramaHandler,
} from './genreDrama.controller';

export const router = Router();

router.post('/', authenticateToken, addGenreToDramaHandler);
router.delete('/', authenticateToken, deleteGenreOfDramaHandler);
router.get('/listGenresByDrama/:dramaId', authenticateToken, listGenresByDramaHandler);
router.get('/listDramasByGenre/:genreId', authenticateToken, listDramasByGenreHandler);

export default router;

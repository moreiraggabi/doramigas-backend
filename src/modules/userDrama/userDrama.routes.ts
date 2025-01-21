import { Router } from 'express';
import {
  filterDramasHandler,
  listDramasByUserHandler,
  listDroppedDramasByUserHandler,
  listFavoriteDramasByUserHandler,
  listWatchedDramasByUserHandler,
  ratingDramaHandler,
  toggleDroppedDramaHandler,
  toggleFavoriteDramaHandler,
  toggleIsWatchedHandler,
  toggleIsWatchingHandler,
} from './userDrama.controller';
import { authenticateToken } from '../user/auth.middleware';

const router = Router();

router.post(
  '/favorite/:dramaId',
  authenticateToken,
  toggleFavoriteDramaHandler,
);
router.post('/dropped/:dramaId', authenticateToken, toggleDroppedDramaHandler);
router.post('/watching/:dramaId', authenticateToken, toggleIsWatchingHandler);
router.post('/watched/:dramaId', authenticateToken, toggleIsWatchedHandler);
router.post('/rating/:dramaId', authenticateToken, ratingDramaHandler);
router.get('/', authenticateToken, listDramasByUserHandler);
router.get('/favorites', authenticateToken, listFavoriteDramasByUserHandler);
router.get('/watched', authenticateToken, listWatchedDramasByUserHandler);
router.get('/dropped', authenticateToken, listDroppedDramasByUserHandler);
router.get('/filter', authenticateToken, filterDramasHandler);

export default router;

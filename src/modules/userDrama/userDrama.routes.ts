import { Router } from 'express';
import {
  ratingDramaHandler,
  toggleDroppedDramaHandler,
  toggleFavoriteDramaHandler,
  toggleIsWatchingHandler,
} from './userDrama.controller';
import { authenticateToken } from '../user/auth.middleware';

const router = Router();

router.post('/favorite', authenticateToken, toggleFavoriteDramaHandler);
router.post('/dropped', authenticateToken, toggleDroppedDramaHandler);
router.post('/watching', authenticateToken, toggleIsWatchingHandler);
router.post('/rating', authenticateToken, ratingDramaHandler);

export default router;

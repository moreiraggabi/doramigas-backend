import { Router } from 'express';
import {
  createGenreHandler,
  deleteGenreHandler,
  editGenreHandler,
  listAllHandler,
} from './genre.controller';
import { authenticateToken } from '../user/auth.middleware';

const router = Router();

router.post('/', authenticateToken, createGenreHandler);
router.put('/', authenticateToken, editGenreHandler);
router.delete('/', authenticateToken, deleteGenreHandler);
router.get('/', authenticateToken, listAllHandler);

export default router;

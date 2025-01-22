import { Router } from 'express';
import { authenticateToken } from '../user/auth.middleware';
import {
  createActorHandler,
  deleteActorHandler,
  editActorHandler,
  listActorsHandler,
} from './actors.controller';

export const router = Router();

router.post('/', authenticateToken, createActorHandler);
router.put('/', authenticateToken, editActorHandler);
router.get('/', authenticateToken, listActorsHandler);
router.delete('/', authenticateToken, deleteActorHandler);

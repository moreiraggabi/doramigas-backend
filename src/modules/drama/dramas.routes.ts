import { Router } from 'express';
import {
  createDramaHandler,
  listDramasHandler,
  getDramaByIdHandler,
  editDramaHandler,
  deleteDramaHandler,
} from './drama.controller';
import { authenticateToken } from '../user/auth.middleware';

const router = Router();

router.post('/', authenticateToken, createDramaHandler); // cadastrar dorama
router.get('/', authenticateToken, listDramasHandler); // listar todos os doramas
router.get('/:id', authenticateToken, getDramaByIdHandler); // listar drama pelo id
router.put('/:id', authenticateToken, editDramaHandler);
router.delete('/:id', authenticateToken, deleteDramaHandler);

export default router;

import { Router } from 'express';
import {
  loginUserHandler,
  createUserHandler,
  editUserHandler,
} from './user.controller';

const router = Router();

router.post('/register', createUserHandler); //cadastro
router.post('/login', loginUserHandler); //login
router.put('/:id', editUserHandler);

export default router;

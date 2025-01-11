import { Router } from 'express';
import {
  loginUserHandler,
  createUserHandler,
} from './user.controller';

const router = Router();

router.post('/register', createUserHandler); //cadastro
router.post('/login', loginUserHandler); //login

export default router;

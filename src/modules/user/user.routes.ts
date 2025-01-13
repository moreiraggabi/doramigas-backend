import { Router } from 'express';
import {
  loginUserHandler,
  createUserHandler,
  editUserHandler,
  listUsersHandler,
  listUserByIdHandler,
  deleteUserHandler,
} from './user.controller';

const router = Router();

router.post('/register', createUserHandler); //cadastro
router.post('/login', loginUserHandler); //login
router.put('/:id', editUserHandler);
router.get('/', listUsersHandler);
router.get('/:id', listUserByIdHandler);
router.delete(':id', deleteUserHandler)

export default router;

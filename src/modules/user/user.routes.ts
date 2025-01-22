import { Router } from 'express';
import {
  loginUserHandler,
  createUserHandler,
  editUserHandler,
  listUsersHandler,
  listUserByIdHandler,
  deleteUserHandler,
  authenticatedUserProfileHandler,
  userProfileByIdHandler,
} from './user.controller';
import { authenticateToken } from './auth.middleware';

const router = Router();

router.post('/register', createUserHandler); //cadastro
router.post('/login', loginUserHandler); //login
router.put('/:id', editUserHandler);
router.delete(':id', deleteUserHandler);
router.get('/', listUsersHandler);
router.get('/:id', listUserByIdHandler);
router.get(
  '/authenticatedUserProfile',
  authenticateToken,
  authenticatedUserProfileHandler,
);
router.get('/userProfile', authenticateToken, userProfileByIdHandler);

export default router;

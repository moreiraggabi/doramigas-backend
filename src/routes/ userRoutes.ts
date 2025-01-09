import { Router } from 'express';
import { loginUsser, registerUser } from '../controllers/userController';

const router = Router();


router.post('/register', registerUser); //cadastro
router.post('/login', loginUsser) //login

export default router;

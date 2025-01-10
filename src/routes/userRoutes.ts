import { Router } from 'express';
import { loginUsser, registerUser } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { AuthenticatedRequest } from '../custom';

const router = Router();


router.post('/register', registerUser); //cadastro
router.post('/login', loginUsser) //login

// Rota protegida - Exemplo
router.get('/profile', authenticateToken, (req: AuthenticatedRequest, res) => {
    res.json({ message: `Bem-vindo, usuário ${req.user?.email}!` });
});

export default router;

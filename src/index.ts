import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import dramaRoutes from './routes/dramasRoutes'

dotenv.config()

const app = express();
app.use(bodyParser.json());

// Usar as rotas de usuários
app.use('/api/users', userRoutes);
app.use('/api/dramas', dramaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

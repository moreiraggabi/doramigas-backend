import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './modules/user/user.routes';
import dramaRoutes from './modules/drama/dramas.routes';
import userDramaRoutes from './modules/userDrama/userDrama.routes';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Usar as rotas de usuários
app.use('/api/users', userRoutes);
app.use('/api/dramas', dramaRoutes);
app.use('/api/userDrama', userDramaRoutes)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

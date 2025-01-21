import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './modules/user/user.routes';
import dramaRoutes from './modules/drama/dramas.routes';
import userDramaRoutes from './modules/userDrama/userDrama.routes';
import genreRoutes from './modules/genres/genre.routes';
import genreDramaRoutes from './modules/genreDrama/genreDrama.routes';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Usar as rotas de usuários
app.use('/api/users', userRoutes);
app.use('/api/dramas', dramaRoutes);
app.use('/api/userDrama', userDramaRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/genreDrama', genreDramaRoutes);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

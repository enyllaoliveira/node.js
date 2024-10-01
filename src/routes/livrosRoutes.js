import express from 'express';
import LivroController from '../controllers/livroController.js';

const routes = express.Router();

routes.get('/livros', LivroController.listLivros);
routes.get('/livros/search', LivroController.listBooksByFilter);
routes.get('/livros/:id', LivroController.listLivroById);
routes.post('/livros', LivroController.addBook);
routes.put('/livros/:id', LivroController.updateLivroById);
routes.delete('/livros/:id', LivroController.deleteLivroById);

export default routes;

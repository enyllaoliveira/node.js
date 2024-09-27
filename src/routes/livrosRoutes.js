import express from "express";
import LivroController from "../controllers/livroController.js";

const routes = express.Router();

routes.get("/livros", LivroController.listLivros);
routes.get("/livros/:id", LivroController.listLivroById);
routes.get("/livros", LivroController.addBook);
routes.get("/livros/:id", LivroController.updateLivroById);

export default routes;

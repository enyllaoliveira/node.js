// centralizar toda a lógica que está relacionada com as ações que podem ser feitas em um autor

import { author } from "../models/Autor.js";

class AuthorController {
  static async listAuthors(req, res) {
    try {
      const listAuthors = await author.find({});
      res.status(200).json(listAuthors);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao listar os autores`,
        error: erro.message,
      });
    }
  }

  static async listAuthorById(req, res) {
    try {
      const id = req.params.id;
      const findAuthor = await author.findById(id);
      res.status(200).json(findAuthor);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao encontrar o autor`,
        error: erro.message,
      });
    }
  }

  static async addAuthor(req, res) {
    try {
      const newAuthor = await author.create(req.body);
      res.status(201).json({
        message: "Autor criado com sucesso",
        author: newAuthor,
      });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao cadastrar o autor`,
        error: erro.message,
      });
    }
  }
  static async updateAuthorById(req, res) {
    try {
      const id = req.params.id;
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado" });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha na atualização do autor`,
        error: erro.message,
      });
    }
  }

  static async deleteAuthorById(req, res) {
    try {
      const id = req.params.id;
      await author.findByIdAndDelete(id);
      res.status(200).json({ message: "Autor deletado com sucesso" });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha na exclusão do autor`,
        error: erro.message,
      });
    }
  }
}

// lembrar de adicionar cada uma dessas rotas em routes
export default AuthorController;

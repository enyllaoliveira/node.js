// centralizar toda a lógica que está relacionada com as ações que podem ser feitas em um autor

import { author } from '../models/Autor.js';

class AuthorController {
  static listAuthors = async (req, res) => {
    try {
      const listAuthors = await author.find();

      res.status(200).json(listAuthors);
    } catch (erro) {
      res.status(500).json({ message: 'Erro interno no servidor' }, erro);
    }
  };

  static listAuthorById = async (req, res) => {
    try {
      const id = req.params.id;

      const findAuthor = await author.findById(id);

      res.status(200).send(findAuthor);
    } catch (erro) {
      res
        .status(400)
        .send({ message: `${erro.message} - Id do Autor não localizado.` });
    }
  };

  static addAuthor = async (req, res) => {
    try {
      const newAuthor = await author.create(req.body);
      res.status(201).json({
        message: 'Autor criado com sucesso',
        author: newAuthor,
      });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao cadastrar o autor`,
        error: erro.message,
      });
    }
  };
  static updateAuthorById = async (req, res) => {
    try {
      const id = req.params.id;
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'Autor atualizado' });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha na atualização do autor`,
        error: erro.message,
      });
    }
  };

  static deleteAuthorById = async (req, res) => {
    try {
      const id = req.params.id;
      await author.findByIdAndDelete(id);
      res.status(200).json({ message: 'Autor deletado com sucesso' });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha na exclusão do autor`,
        error: erro.message,
      });
    }
  };
}

// lembrar de adicionar cada uma dessas rotas em routes
export default AuthorController;

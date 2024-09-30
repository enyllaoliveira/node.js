// centralizar toda a lógica que está relacionada com as ações que podem ser feitas em um livro

import livro from '../models/Livro.js';
import { author } from '../models/Autor.js';

class LivroController {
  static listLivros = async (req, res) => {
    try {
      const listBooks = await livro.find({});
      res.status(200).json(listBooks);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao listar os livros`,
        error: erro.message,
      });
    }
  };

  static listLivroById = async (req, res) => {
    try {
      const id = req.params.id;
      const findBook = await livro.findById(id);
      res.status(200).json(findBook);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao encontrar o livro`,
        error: erro.message,
      });
    }
  };

  static addBook = async (req, res) => {
    const newBook = req.body;

    try {
      const authorFinded = await author.findById(newBook.author);
      if (!authorFinded) {
        return res.status(404).json({
          message: 'Autor não encontrado',
        });
      }

      const completBook = {
        ...newBook,
        author: authorFinded,
      };

      const createBook = await livro.create(completBook);
      res.status(201).json({
        message: 'Livro criado com sucesso',
        book: createBook,
      });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao cadastrar o livro`,
        error: erro.message,
      });
    }
  };

  static updateLivroById = async (req, res) => {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'Livro atualizado' });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha na atualização do livro`,
        error: erro.message,
      });
    }
  };

  static deleteLivroById = async (req, res) => {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: 'Livro deletado com sucesso' });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha na exclusão do livro`,
        error: erro.message,
      });
    }
  };

  static listBooksBySeller = async (req, res) => {
    const seller = req.query.seller;
    try {
      const booksBySeller = await livro.find({ editora: seller });
      res.status(200).json(booksBySeller);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha na busca`,
        error: erro.message,
      });
    }
  };
}

// lembrar de adicionar cada uma dessas rotas em routes
export default LivroController;

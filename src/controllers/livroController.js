// centralizar toda a lógica que está relacionada com as ações que podem ser feitas em um livro

import livro from '../models/Livro.js';
import { author } from '../models/Autor.js';

class LivroController {
  static listLivros = async (req, res, next) => {
    try {
      const listBooks = await livro.find({});
      res.status(200).json(listBooks);
    } catch (erro) {
      // res.status(500).json({
      //   message: `${erro.message} - Falha ao listar os livros`,
      //   error: erro.message,
      // });
      // antes estava assim em tudo, o código fica grande e não aproveitável. Assim, pega o next do próprio mongoose para fazer o controle de erros
      next(erro);
    }
  };

  static listLivroById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const findBook = await livro.findById(id);
      res.status(200).json(findBook);
    } catch (erro) {
      // res.status(500).json({
      //   message: `${erro.message} - Falha ao encontrar o livro`,
      //   error: erro.message,
      // });
      next(erro);
    }
  };

  static addBook = async (req, res, next) => {
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
      next(erro);
    }
  };

  static updateLivroById = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'Livro atualizado' });
    } catch (erro) {
      next(erro);
    }
  };

  static deleteLivroById = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: 'Livro deletado com sucesso' });
    } catch (erro) {
      next(erro);
    }
  };

  static listBooksBySeller = async (req, res, next) => {
    const seller = req.query.seller;
    try {
      const booksBySeller = await livro.find({ editora: seller });
      res.status(200).json(booksBySeller);
    } catch (erro) {
      next(erro);
    }
  };
}

// lembrar de adicionar cada uma dessas rotas em routes
export default LivroController;

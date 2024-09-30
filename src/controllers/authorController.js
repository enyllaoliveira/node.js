// centralizar toda a lógica que está relacionada com as ações que podem ser feitas em um autor
import { author } from '../models/Autor.js';

class AuthorController {
  static listAuthors = async (req, res, next) => {
    try {
      const listAuthors = await author.find();

      res.status(200).json(listAuthors);
    } catch (erro) {
      // res.status(500).json({ message: 'Erro interno no servidor' }, erro);
      // antes estava assim em tudo, o código fica grande e não aproveitável. Assim, pega o next do próprio mongoose para fazer o controle de erros
      next(erro);
    }
  };

  static listAuthorById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const findAuthor = await author.findById(id);

      if (findAuthor !== null) {
        res.status(200).send(findAuthor);
      } else {
        res.status(404).send({ message: 'Id do Autor não localizado.' });
      }
    } catch (erro) {
      next(erro);
    }
  };

  static addAuthor = async (req, res, next) => {
    try {
      const newAuthor = await author.create(req.body);
      res.status(201).json({
        message: 'Autor criado com sucesso',
        author: newAuthor,
      });
    } catch (erro) {
      next(erro);
    }
  };
  static updateAuthorById = async (req, res, next) => {
    try {
      const id = req.params.id;
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'Autor atualizado' });
    } catch (erro) {
      next(erro);
    }
  };

  static deleteAuthorById = async (req, res, next) => {
    try {
      const id = req.params.id;
      await author.findByIdAndDelete(id);
      res.status(200).json({ message: 'Autor deletado com sucesso' });
    } catch (erro) {
      // res.status(500).json({
      //   message: `${erro.message} - Falha na exclusão do autor`,
      //   error: erro.message,
      // });
      // antes estava assim em tudo, o código fica grande e não aproveitável. Assim, pega o next do próprio mongoose para fazer o controle de erros
      next(erro);
    }
  };
}

// lembrar de adicionar cada uma dessas rotas em routes
export default AuthorController;

// centralizar toda a lógica que está relacionada com as ações que podem ser feitas em um livro

import { livro } from '../models/index.js';
import { author } from '../models/Autor.js';
import NotFound from '../errors/NotFound.js';
import WrongReq from '../errors/WrongReq.js';

class LivroController {
  static listLivros = async (req, res, next) => {
    try {
      let { limite = 15, paginas = 1, ordenacao = '_id:-1' } = req.query;

      let [campoOrdenacao, ordem] = ordenacao.split(':');
      limite = parseInt(limite);
      paginas = parseInt(paginas);
      ordem = parseInt(ordem);

      if (limite > 0 && paginas > 0) {
        const listBooks = await livro
          .find()
          .sort({ [campoOrdenacao]: ordem })
          .limit(limite)
          .skip((paginas - 1) * limite)
          .populate('author')
          .exec();

        res.status(200).json(listBooks);
      } else {
        next(new WrongReq());
      }
    } catch (erro) {
      // res.status(500).json({
      //   message: `${erro.message} - Falha ao listar os livros`,
      //   error: erro.message,
      // });
      // antes estava assim em tudo, o código fica grande e não aproveitável. Assim, pega o next do próprio mongoose para fazer o controle de erros
      next(erro);
    }
  };

  // static listLivroById = async (req, res, next) => {
  //   try {
  //     const id = req.params.id;
  //     const findBook = await livro.findById(id);
  //     res.status(200).json(findBook);
  //   } catch (erro) {
  //     // res.status(500).json({
  //     //   message: `${erro.message} - Falha ao encontrar o livro`,
  //     //   error: erro.message,
  //     // });
  //     next(erro);
  //   }
  // };

  static listLivroById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const findBook = await livro
        .findById(id)
        .populate('autor', 'nome')
        .exec();

      if (findBook !== null) {
        res.status(200).send(findBook);
      } else {
        next(new NotFound('Id do livro não localizado.'));
      }
    } catch (erro) {
      next(erro);
    }
  };
  static addBook = async (req, res, next) => {
    const newBook = req.body;

    try {
      if (!newBook.author) {
        const error = new Error('O campo "author" é obrigatório');
        error.statusCode = 400;
        throw error;
      }

      const authorFinded = await author.findById(newBook.author);
      if (!authorFinded) {
        const error = new Error('Autor não encontrado');
        error.statusCode = 404;
        throw error;
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

      const livroResult = await livro.findByIdAndUpdate(id, { $set: req.body });

      console.log(livroResult);

      if (livroResult !== null) {
        res.status(200).send({ message: 'Livro atualizado com sucesso' });
      } else {
        next(new NotFound('Id do livro não localizado.'));
      }
    } catch (erro) {
      next(erro);
    }
  };

  // static deleteLivroById = async (req, res, next) => {
  //   try {
  //     const id = req.params.id;
  //     await livro.findByIdAndDelete(id);
  //     res.status(200).json({ message: 'Livro deletado com sucesso' });
  //   } catch (erro) {
  //     next(erro);
  //   }
  // };

  static deleteLivroById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResult = await livro.findByIdAndDelete(id);

      console.log(livroResult);

      if (livroResult !== null) {
        res.status(200).send({ message: 'Livro removido com sucesso' });
      } else {
        next(new NotFound('Id do livro não localizado.'));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listBooksByFilter = async (req, res, next) => {
    try {
      const search = await processSearch(req.query);
      const booksBySeller = await livro.find(search).populate('author');
      res.status(200).json(booksBySeller);
    } catch (erro) {
      next(erro);
    }
  };
}

async function processSearch(params) {
  const { editora, titulo, minPages, maxPages, nameAuthor } = params;

  const search = {};
  if (editora) search.editora = editora;
  if (titulo)
    search.titulo = {
      $regex: titulo,
      $options: 'i',
    };
  if (minPages || maxPages) {
    search.paginas = {};

    if (minPages) {
      search.paginas.$gte = minPages; // >= minPages
    }

    if (maxPages) {
      search.paginas.$lte = maxPages; // <= maxPages
    }
  }
  if (nameAuthor) {
    search['author.nome'] = { $regex: new RegExp(nameAuthor.trim(), 'i') };
  }
  return search;
}
export default LivroController;

// centralizar toda a lógica que está relacionada com as ações que podem ser feitas em um livro

import livro from "../models/Livro.js";

class LivroController {
  static async listLivros(req, res) {
    try {
      const listBooks = await livro.find({});
      res.status(200).json(listBooks);
    } catch (erro) {
      res.status(500).json({
        message: `${err.message} - Falha ao listar os livros`,
        error: err.message,
      });
    }
  }
  
  static async listLivroById(req, res) {
    try {
      const id = req.params.id;
      const findBook = await livro.finsdById(id);
      res.status(200).json(findBook);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao encontrar o livro`,
        error: erro.message,
      });
    }
  }



  static async addBook(req, res) {
    try {
      const newBook = await livro.create(req.body);
      res.status(201).json({
        message: "Livro criado com sucesso",
        book: newBook,
      });
    } catch (erro) {
        res.status(500).json({
            message: `${erro.message} - Falha ao cadastrar o livro`,
            error: erro.message,
        })
    }
  }
  static async updateLivroById(req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: "Livro atualizado"});
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha na atualização do livro`,
        error: erro.message,
      });
    }
  }

}

// lembrar de adicionar cada uma dessas rotas em routes
export default LivroController;

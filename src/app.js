import express from 'express';
import connectDatabase from './config/dbConnect.js';
import mongoose from 'mongoose';
// import livro from '../src/models/Livro.js' - passou para o controller a responsabilidade
import routes from '../index.js';
import manipuladorDeErros from './middlewares/manipuladorDeErros.js';
import manipulator404 from './middlewares/manipulador404.js';

try {
  await connectDatabase();

  const connection = mongoose.connection;

  connection.on('error', (erro) => {
    console.error('Erro de conexão:', erro);
  });

  connection.once('open', () => {
    console.log('Conexão com o banco feita com sucesso');
  });
} catch (erro) {
  console.error('Erro ao tentar conectar ao banco de dados:', erro);
}

const app = express();
routes(app);

app.use(manipulator404);
// criação de um middleware, que é uma função especial do express que será executada em toda requisição feita para a API ou em certas requisições.
// esse middleware é de erro e é caracterizada por receber 4 parâmetros, mesmo que não use as 4

app.use(manipuladorDeErros);

// app.use(express.json()); - passou a responsabilidade para routes

// const livros = [
//   { id: 1, titulo: "O Senhor dos Anéis" },
//   {
//     id: 2,
//     titulo: "O Hobbit",
//   },
// ]; estava criando manual, mas foi criado no Livros.js do BD
// a função searchBooks estava relacionada com essa constante e nao faz mais sentido

// function searchBooks(id) {
//   return livros.findIndex((livro) => {
//     return livro.id === Number(id);
//   });
// }

// app.get("/", (req, res) => {
//   res.status(200).send("Curso de node.js");
// }); - passou a responsabilidade para routes

// app.get("/livros", (req, res) => {
//   res.status(200).json(livros);
// }); antes estava assim pegando da const, a próxima é pegando do BD re fatorado

// app.get("/livros", async (req, res) => {
//     const listBooks = await livro.find({});
//     res.status(200).json(listBooks);
//   }); - esta sendo transferida para livroController

// app.get("/livros/:id", (req, res) => {
//   const index = searchBooks(req.params.id);
//   res.status(200).json(livros[index]);
// }); - esta sendo transferida para livroController

// app.put("/livros/:id", (req, res) => {
//   const index = searchBooks(req.params.id);
//     livros[index].titulo = req.body.titulo;
//     res.status(200).json(livros);
// }) - esta sendo transferida para livroController

// app.post("/livros", (req, res) => {
//   livros.push(req.body);
//   res.status(201).send("livro cadastrado com sucesso");
// });- esta sendo transferida para livroController

// app.delete("/livros/:id", (req, res) => {
//     const index = searchBooks(req.params.id);
//       livros.splice(index, 1)
//       res.status(200).send("Item deletado")
//   })

// aqui esta passando para o express (framework) a responsabilidade de gerenciar as rotas que estavámos fazendo na unha no server.js como um objeto js.

export default app;

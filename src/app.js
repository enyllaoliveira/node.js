import express from "express";

const app = express();
app.use(express.json());

const livros = [
  { id: 1, titulo: "O Senhor dos Anéis" },
  {
    id: 2,
    titulo: "O Hobbit",
  },
];

function searchBooks(id) {
  return livros.findIndex((livro) => {
    return livro.id === Number(id);
  });
}

app.get("/", (req, res) => {
  res.status(200).send("Curso de node.js");
});

app.get("/livros", (req, res) => {
  res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) => {
  const index = searchBooks(req.params.id);
  res.status(200).json(livros[index]);
});

app.put("/livros/:id", (req, res) => {
  const index = searchBooks(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
})

app.delete("/livros/:id", (req, res) => {
    const index = searchBooks(req.params.id);
      livros.splice(index, 1)
      res.status(200).send("Item deletado")
  })

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("livro cadastrado com sucesso");
});
// aqui esta passando para o express (framework) a responsabilidade de gerenciar as rotas que estavámos fazendo na unha no server.js como um objeto js.

export default app;

// mongodb+srv://enyllaadmin:<db_password>@cluster0.eluoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

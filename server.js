// import http from "http"; // começou aqui e depois foi criado o app.js e instalado embaixo
import 'dotenv/config';
import app from './src/app.js';

const PORT = 3000;

const rotas = {
  '/': 'Curso do Nodesss.js',
  '/livros': 'Entrei na rota livros',
  '/autores': 'Entrei na rota autores',
};
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end(rotas[req.url]);
// }); nao precisa mais, pois quem vai criar o servidor é o app (o express)

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// }); antes era o server, agora é o próprio app

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

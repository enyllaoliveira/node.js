import express from "express";
import livro from './src/routes/livrosRoutes.js'
import author from './src/routes/authorRoutes.js'

const routes = (app) => {
app.route('/').get((req, res) => res.status(200).send("Curso de Node.js"));

app.use(express.json(), livro, author)
}

export default routes
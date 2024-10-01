import mongoose from 'mongoose';
import { authorSchema } from './Autor.js';
const livroSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    titulo: {
      type: String,
      required: [true, 'O título do livro é obrigatório'],
    },
    editora: {
      type: String,
      required: [true, 'A editora do livro é obrigatória'],
      enum: {
        values: ['Casa do código', 'Testando'],
        message: 'A editora {VALUE} não é um valor permitido',
      },
    },
    preco: {
      type: Number,
    },
    paginas: {
      type: Number,
      validate: {
        validator: (value) => {
          return value >= 10 && value <= 5000;
        },
        message:
          'O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}',
      },
      // poderia ser:
      // min: [
      //   10,
      //   'O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}',
      // ],
      // max: [
      //   5000,
      //   'O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}',
      // ],
    },
    author: authorSchema,
  },
  { versionKey: false }
);

export const livro = mongoose.model('livros', livroSchema);

export default livro;

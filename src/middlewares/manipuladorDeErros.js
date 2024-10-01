import mongoose from 'mongoose';
import ErroBase from '../errors/ErroBase.js';
import WrongReq from '../errors/WrongReq.js';
import WrongValitation from '../errors/WrongValidation.js';
import NotFound from '../errors/NotFound.js';

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new WrongReq().sendAnswer(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new WrongValitation(erro).sendAnswer(res);
  } else if (erro instanceof NotFound) {
    erro.sendAnswer(res);
  } else {
    new ErroBase().sendAnswer(res);
  }
}

export default manipuladorDeErros;

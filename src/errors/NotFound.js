import ErroBase from './ErroBase.js';

class NotFound extends ErroBase {
  constructor(message = 'Página não encontrada') {
    super(message, 404);
  }
}

export default NotFound;

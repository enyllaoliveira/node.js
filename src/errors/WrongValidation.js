import WrongReq from './WrongReq.js';

class WrongValitation extends WrongReq {
  constructor(erro) {
    const messageErro = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join('; ');
    super(`Os seguintes erros foram encontrados: ${messageErro}`);
  }
}

export default WrongValitation;

import WrongReq from '../errors/WrongReq.js';

async function pagination(req, res, next) {
  try {
    let { limite = 15, paginas = 1, ordenacao = '_id:-1' } = req.query;

    let [campoOrdenacao, ordem] = ordenacao.split(':');
    limite = parseInt(limite);
    paginas = parseInt(paginas);
    ordem = parseInt(ordem);

    const result = req.result;
    if (limite > 0 && paginas > 0) {
      const listResultBooks = await result
        .find()
        .sort({ [campoOrdenacao]: ordem })
        .limit(limite)
        .skip((paginas - 1) * limite)
        .populate('author')
        .exec();

      res.status(200).json(listResultBooks);
    } else {
      next(new WrongReq());
    }
  } catch (erro) {
    next(erro);
  }
}

export default pagination;

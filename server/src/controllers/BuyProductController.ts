import { Request, Response } from 'express';
import db from '../database/connection';

class BuyProductController {
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { comprado } = req.body;

    try {
      await db('produtos')
        .update('comprado', comprado)
        .where('id_produto', '=', id);

      return res
        .status(200)
        .json({
          message: comprado
            ? 'Produto comprado com sucesso.'
            : 'Produto desmarcado com sucesso.',
        });
    } catch (error) {
      return res.status(400).json({ message: 'Houve um problema ao ..' });
    }
  }
}

export default BuyProductController;

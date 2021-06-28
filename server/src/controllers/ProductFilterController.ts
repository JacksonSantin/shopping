import { Request, Response } from 'express';
import db from '../database/connection';

class ProductFilterController {
  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const products = await db('produtos').where('id_estabelecimento', id);

      return res.status(200).json(products);
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Houve um problema ao buscar os produtos' });
    }
  }
}

export default ProductFilterController;

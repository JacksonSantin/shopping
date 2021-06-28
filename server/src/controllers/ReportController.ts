import { Request, Response } from 'express';
import db from '../database/connection';

class ReportController {
  async productQuantity(req: Request, res: Response) {
    const { id } = req.params;
    const products = await db('produtos')
      .select(['id_produto', 'nome', 'quantidade'])
      .where('id_usuario', '=', id)
      .limit(10);

    let color = '';
    const productSerialization = products.map((product, index) => {
      if (index === 0) {
        color = '#000000';
      } else if (index === 1) {
        color = '#f00';
      } else if (index === 2) {
        color = '#0000ff';
      } else if (index === 3) {
        color = '#85eb65';
      } else if (index === 4) {
        color = '#4b3621';
      } else if (index === 5) {
        color = '#6A5ACD';
      } else if (index === 6) {
        color = '#00FA9A';
      } else if (index === 7) {
        color = '#DEB887';
      } else if (index === 8) {
        color = '#FF00FF';
      } else if (index === 9) {
        color = '#DC143C';
      }
      return {
        ...product,
        color,
      };
    });

    return res.status(200).json(productSerialization);
  }
}
export default ReportController;

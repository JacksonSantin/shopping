import { Request, Response } from 'express';
import db from '../database/connection';

class ProductRegisterController {
  async index(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const establishments = await db('estabelecimento')
        .select(['id_estabelecimento', 'nome'])
        .where('id_usuario', '=', id);

      const establishmentsSerialization = establishments.map(
        (establishment) => {
          return {
            key: establishment.id_estabelecimento,
            label: establishment.nome,
          };
        }
      );

      const section = {
        section: true,
        key: '0',
        label: 'Estabelecimentos',
      };

      const establishmentsList = [section, ...establishmentsSerialization];

      return res.status(200).json(establishmentsList);
    } catch (error) {
      return res.status(400).json({
        message: 'Houve um problema ao buscar os estabelecimentos.',
      });
    }
  }
}
export default ProductRegisterController;

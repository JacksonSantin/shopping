import { Request, Response } from 'express';
import db from '../database/connection';

class EstablishmentController {
  async index(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const establishments = await db('estabelecimento')
        .select(['id_estabelecimento', 'nome'])
        .where('id_usuario', '=', id);

      return res.status(200).json(establishments);
    } catch (error) {
      return res.status(400).json({
        message:
          'Houve um problema ao buscar as informações dos estabelecimentos.',
      });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const [establishment] = await db('estabelecimento')
        .select(['nome', 'rua', 'numero', 'complemento', 'cidade', 'bairro'])
        .where('id_estabelecimento', '=', id);

      return res.status(200).json(establishment);
    } catch (error) {
      return res.status(400).json({
        message:
          'Houve um problema ao buscar as informações do estabelecimento.',
      });
    }
  }

  async create(req: Request, res: Response) {

    const {
      nome,
      rua,
      numero,
      complemento,
      cidade,
      bairro,
      id_usuario,
    } = req.body;

    try {
      await db('estabelecimento').insert({
        nome,
        rua,
        numero,
        complemento,
        cidade,
        bairro,
        id_usuario,
      });

      return res.status(201).send();
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Houve um problema ao realizar o cadastro' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await db('estabelecimento')
        .update(req.body)
        .where('id_estabelecimento', '=', id);

      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).json({
        message:
          'Houve um problema ao atualizar as informações dos estabelecimento.',
      });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const productExist = await db('produtos')
        .select('*')
        .where('id_estabelecimento', '=', id);

      if (productExist.length > 0)
        return res
          .status(400)
          .json({ message: 'Esse estabelecimento não pode ser apagado' });

      await db('estabelecimento').where('id_estabelecimento', '=', id).del();

      return res.sendStatus(200);
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Houve um problema ao apagar o estabelecimento.' });
    }
  }
}

export default EstablishmentController;

import { Request, Response } from 'express';
import db from '../database/connection';

class ProductsController {
  async index(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const produtos = await db('produtos')
        .select(['id_produto', 'nome', 'quantidade', 'comprado'])
        .where('id_usuario', '=', id);

      const produtosSerializados = produtos.map((produto) => {
        return {
          ...produto,
          comprado: produto.comprado === 0 ? false : true,
        };
      });

      return res.status(200).json(produtosSerializados);
    } catch (error) {
      return res.status(400).json({
        message: 'Houve um problema ao buscar as informações dos produtos.',
      });
    }
  }
  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const [products] = await db('produtos')
        .select(['nome', 'quantidade', 'valor_unitario'])
        .where('id_produto', '=', id);

      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json({
        message: 'Houve um problema ao buscar as informações do produto.',
      });
    }
  }
  async create(req: Request, res: Response) {
    const {
      nome,
      quantidade,
      valorUnitario,
      total,
      estabelecimento,
      id_usuario,
    } = req.body;

    try {
      await db('produtos').insert({
        nome,
        quantidade,
        valor_unitario: valorUnitario,
        total,
        id_estabelecimento: estabelecimento,
        id_usuario,
      });

      return res.sendStatus(201);
    } catch (error) {
      console.log(error);

      return res
        .status(400)
        .json({ message: 'Houve um problema ao realizar o cadastro' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await db('produtos').update(req.body).where('id_produto', '=', id);

      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).json({
        message: 'Houve um problema ao atualizar as informações do produto.',
      });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await db('produtos').where('id_produto', '=', id).del();

      return res.sendStatus(200);
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Houve um problema ao apagar o produto.' });
    }
  }
}

export default ProductsController;

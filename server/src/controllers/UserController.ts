import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../database/connection';
import generateToken from '../utils/generateToken';

interface User {
  [x: string]: any;
  id_usuario: number;
}

class UserController {
  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const [user] = await db('usuario')
        .select([
          'nome',
          'email',
          'usuario',
          'cpf',
          'rua',
          'numero',
          'complemento',
          'cidade',
          'bairro',
        ])
        .where('id_usuario', '=', id);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        message: 'Houve um problema ao buscar as informações do usuário.',
      });
    }
  }
  async create(req: Request, res: Response) {
    const { nome, email, usuario, senha } = req.body;

    try {
      let [user] = await db('usuario')
        .select(['usuario', 'email'])
        .where('usuario', '=', usuario)
        .orWhere('email', '=', email);

      if (user?.usuario || user?.email)
        return res.status(400).json({ message: 'Usuário já existe' });

      const hashSenha = bcrypt.hashSync(senha, 8);

      user = await db('usuario').insert<User>({
        nome,
        email,
        usuario,
        senha: hashSenha,
      });

      return res
        .status(201)
        .json({ id: user[0], token: generateToken({ id: user[0] }) });
    } catch (error) {
      console.log(error);

      return res
        .status(400)
        .json({ message: 'Houve um problema ao realizar o cadastro' });
    }
  }

  async update(req: Request, res: Response) {
    const { userid } = req.headers;

    req.body.numero = Number(req.body.numero);

    try {
      await db('usuario').update(req.body).where('id_usuario', userid);

      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).json({
        message: 'Houve um problema ao atualizar as informações do usuário.',
      });
    }
  }
}

export default UserController;

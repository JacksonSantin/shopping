import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';
import db from '../database/connection';

class SessionController {
  async create(req: Request, res: Response) {
    const { usuario, senha } = req.body;

    try {
      const [user] = await db('usuario')
        .select(['id_usuario', 'usuario', 'senha'])
        .where('usuario', usuario);

      if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha incorretos' });
      }

      if (!bcrypt.compareSync(senha, user.senha)) {
        return res.status(401).json({ message: 'Usuário ou senha incorretos' });
      }

      return res
        .status(201)
        .json({
          id: user.id_usuario,
          token: generateToken({ id: user.id_usuario }),
        });
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Houve um problema ao realizar login' });
    }
  }
}

export default SessionController;

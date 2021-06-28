import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json';

interface Parameters {
  id: number;
}

export default function generateToken(params: Parameters) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400, // 24h
  });
}

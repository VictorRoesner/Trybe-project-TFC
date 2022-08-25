import * as jwt from 'jsonwebtoken';

export default class JwtService {
  static sign(payload: { password: string; email: string }): string {
    return jwt.sign(payload, 'jwt_secret');
  }
}

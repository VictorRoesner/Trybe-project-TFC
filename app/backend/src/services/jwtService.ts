import * as jwt from 'jsonwebtoken';
import CustomError from '../utils/customError';
import IPayload from '../interfaces/IPayload';

export default class JwtService {
  static sign(payload: { password: string; email: string }): string {
    return jwt.sign(payload, 'jwt_secret');
  }

  static validate(token: string): IPayload {
    try {
      const verifiedToken = jwt.verify(token, 'jwt_secret');
      return verifiedToken as IPayload;
    } catch (err) {
      throw new CustomError('UnauthorizedError', 'Expired or invalid token');
    }
  }
}

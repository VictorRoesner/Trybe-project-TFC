import * as bcryptjs from 'bcryptjs';
import CustomError from '../utils/customError';
import IUser from '../interfaces/IUser';
import User from '../database/models/User';
import JwtService from './jwtService';

export default class UserService {
  static async login({ email, password }: IUser) : Promise<string> {
    const user = await User.findOne({ where: { email } });

    if (!user) throw new CustomError('UnauthorizedError', 'Incorrect email or password');
    if (!bcryptjs.compareSync(password, user.password)) {
      throw new CustomError('UnauthorizedError', 'Password not valid');
    }

    const token = JwtService.sign({
      password: user.password,
      email: user.email,
    });

    return token;
  }
}

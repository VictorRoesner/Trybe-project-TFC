import { Request, Response } from 'express';
import validateUser from '../middlewares/ValidateUser';
import UserService from '../services/userService';

export default class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    const validatedLogin = validateUser(req.body);
    const token = await UserService.login(validatedLogin);
    res.status(200).json({ token });
  }
}

import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class matchController {
  static async getAll(req: Request, res: Response): Promise<void> {
    const matches = await MatchService.getAll();
    res.status(200).json(matches);
  }
}

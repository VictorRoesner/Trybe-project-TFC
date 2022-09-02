import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class matchController {
  static async getAll(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    if (typeof inProgress === 'boolean') {
      const matches = await MatchService.getInProgress(inProgress);
      res.status(200).json(matches);
    } const allMatches = await MatchService.getAll();
    res.status(200).json(allMatches);
  }
}

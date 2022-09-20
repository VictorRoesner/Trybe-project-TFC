import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class leaderboardController {
  static async getHome(req: Request, res: Response): Promise<void> {
    const teams = await LeaderboardService.getHome();
    res.status(200).json(teams);
  }

  static async getAway(req: Request, res: Response): Promise<void> {
    const teams = await LeaderboardService.getAway();
    res.status(200).json(teams);
  }
}

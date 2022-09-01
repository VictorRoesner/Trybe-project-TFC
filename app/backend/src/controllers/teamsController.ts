import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class teamsController {
  static async getAll(req: Request, res: Response): Promise<void> {
    const teams = await TeamService.getAll();
    res.status(200).json(teams);
  }
}

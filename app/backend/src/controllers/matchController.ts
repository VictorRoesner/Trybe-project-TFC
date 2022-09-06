import { Request, Response } from 'express';
import CustomError from '../utils/customError';
import JwtService from '../services/jwtService';
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

  static async create(req: Request, res: Response): Promise<void> {
    const { authorization } = req.headers;
    const { homeTeam, awayTeam } = req.body;
    JwtService.validate(authorization as string);
    if (homeTeam === awayTeam) {
      throw new CustomError(
        'UnauthorizedError',
        'It is not possible to create a match with two equal teams',
      );
    }
    const matches = await MatchService.create(req.body);
    res.status(201).json(matches);
  }

  static async finish(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await MatchService.finish(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  static async update(req: Request, res: Response) : Promise<void> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await MatchService.update(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    res.status(200).json({ message: 'Updated' });
  }
}

import Team from '../database/models/Team';
import Match from '../database/models/Match';
import TeamService from './teamService';

export default class MatchService {
  static async getAll(): Promise<Match[]> {
    const matches: Match[] = await Match.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: ['teamName'],
      }, { model: Team, as: 'teamAway', attributes: ['teamName'] }],
    });
    return matches;
  }

  static async getInProgress(inProgress: boolean): Promise<Match[]> {
    const match: Match[] = await Match.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: ['teamName'],
      }, { model: Team, as: 'teamAway', attributes: ['teamName'] }],
      where: { inProgress },
    });
    return match;
  }

  static async create(reqMatch: Match): Promise<Match> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = reqMatch;
    await TeamService.getById(homeTeam);
    await TeamService.getById(awayTeam);
    const match: Match = await Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return match;
  }
}

import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchService {
  static async getAll(): Promise<Match[]> {
    const matches: Match[] = await Match.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: ['teamName'],
      }, { model: Team, as: 'teamAway', attributes: ['teamName'] }],
    });
    return matches;
  }
}

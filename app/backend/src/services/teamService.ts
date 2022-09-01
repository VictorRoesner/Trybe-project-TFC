import Team from '../database/models/Team';

export default class TeamService {
  static async getAll(): Promise<Team[]> {
    const teams: Team[] = await Team.findAll();

    return teams;
  }
}

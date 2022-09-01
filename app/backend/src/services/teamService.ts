import Team from '../database/models/Team';

export default class TeamService {
  static async getAll(): Promise<Team[]> {
    const teams: Team[] = await Team.findAll();

    return teams;
  }

  static async getById(id: number): Promise<Team> {
    const team : Team | null = await Team.findByPk(id);
    return team as Team;
  }
}

import ILeaderbords from '../interfaces/ILeaderboard';
import sequelize from '../database/models';

require('dotenv/config');

const homeQuery = `SELECT
tms.team_name as "name",
(3 * SUM(home_team_goals > away_team_goals))
  + SUM(home_team_goals = away_team_goals) AS "totalPoints",
COUNT(team_name) AS "totalGames",
SUM(home_team_goals > away_team_goals) AS "totalVictories",
SUM(home_team_goals = away_team_goals) AS "totalDraws",
SUM(home_team_goals < away_team_goals) AS "totalLosses",
SUM(home_team_goals) AS "goalsFavor",
SUM(away_team_goals) AS "goalsOwn",
SUM(home_team_goals) - SUM(away_team_goals) AS "goalsBalance",
ROUND((((3 * SUM(home_team_goals > away_team_goals) + SUM(home_team_goals = away_team_goals))
/ (COUNT(team_name) * 3)) * 100), 2) AS "efficiency"
FROM
TRYBE_FUTEBOL_CLUBE.matches AS mt
JOIN
TRYBE_FUTEBOL_CLUBE.teams AS tms
ON
mt.home_team = tms.id
WHERE
mt.in_progress = false
GROUP BY
tms.home_team
ORDER BY
    (3 * SUM(home_team_goals > away_team_goals)) + SUM(home_team_goals = away_team_goals) desc,
    SUM(home_team_goals) - SUM(away_team_goals) desc,
    SUM(home_team_goals) desc,
    SUM(away_team_goals) desc;`;

export default class LeaderboardService {
  static async getHome() :Promise<ILeaderbords[] | unknown> {
    const [teams] = await sequelize.query(homeQuery);
    return teams;
  }
}

import ILeaderbords from '../interfaces/ILeaderboard';
import sequelize from '../database/models';

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
TRYBE_FUTEBOL_CLUBE.matches AS mtch
JOIN
TRYBE_FUTEBOL_CLUBE.teams AS tms
ON
mtch.home_team = tms.id
WHERE
mtch.in_progress = 0
GROUP BY
mtch.home_team
ORDER BY
totalPoints DESC,
totalVictories DESC,
goalsBalance DESC,
goalsFavor DESC,
goalsOwn DESC;
`;

const awayQuery = `SELECT
tms.team_name as "name",
(3 * SUM(away_team_goals > home_team_goals))
  + SUM(away_team_goals = home_team_goals) AS "totalPoints",
COUNT(team_name) AS "totalGames",
SUM(away_team_goals > home_team_goals) AS "totalVictories",
SUM(away_team_goals = home_team_goals) AS "totalDraws",
SUM(away_team_goals < home_team_goals) AS "totalLosses",
SUM(away_team_goals) AS "goalsFavor",
SUM(home_team_goals) AS "goalsOwn",
SUM(away_team_goals) - SUM(home_team_goals) AS "goalsBalance",
    ROUND((((3 * SUM(away_team_goals  > home_team_goals ) + SUM(away_team_goals = home_team_goals))
    / (COUNT(team_name) * 3)) * 100), 2) AS "efficiency"
FROM
TRYBE_FUTEBOL_CLUBE.matches AS mtch
JOIN
TRYBE_FUTEBOL_CLUBE.teams AS tms
ON
mtch.away_team = tms.id
WHERE
mtch.in_progress = 0
GROUP BY
mtch.away_team
ORDER BY
totalPoints DESC,
totalVictories DESC,
goalsBalance DESC,
goalsFavor DESC,
goalsOwn DESC;
`;

export default class LeaderboardService {
  static async getHome() :Promise<ILeaderbords[] | unknown> {
    const [teams] = await sequelize.query(homeQuery);
    return teams;
  }

  static async getAway() :Promise<ILeaderbords[] | unknown> {
    const [teams] = await sequelize.query(awayQuery);
    return teams;
  }
}

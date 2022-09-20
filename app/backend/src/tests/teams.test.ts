import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Team from '../database/models/Team'
import { ITeam } from '../interfaces/ITeam';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const teamMock: ITeam = {
  id: 1,
  teamName: "Avaí/Kindermann"
}

const teamsMock: ITeam[] = [
  {
    id: 1,
    teamName: "Avaí/Kindermann"
  },
  {
    id: 2,
    teamName: "Bahia"
  },
  {
    id: 3,
    teamName: "Botafogo"
  },
  {
    id: 4,
    teamName: "Corinthians"
  }
]

describe('Test endpoint Teams', () => {
  describe('List all teams', () => {
      beforeEach(() => {
      sinon.stub(Team, "findAll").resolves([teamMock as Team])
    })

    afterEach(() => {
      sinon.restore();
    })
    it('should return status 200 and array of teams', async () => {
      const response = await chai.request(app)
        .get('/teams')
        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(teamsMock)
    })

    it('team should have name and id attributes', async () => {
      const response = await chai.request(app)
        .get('/teams')

      const [team] = response.body as ITeam[];

      expect(team.teamName).to.equal(teamMock.teamName);
      expect(team.id).to.equal(teamMock.id);

    })
  })

  describe('Test find by id', () => {
    it('should return status 200 and a specific team by id', async () => {
      sinon.stub(Team, "findByPk").resolves(teamMock as Team)
       const response = await chai.request(app).get('/teams/1')

      expect(response.status).to.equal(200)
      expect(response.body).to.deep.equal(teamMock)

      sinon.restore();
    })
  })
});

import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { IMatch } from '../interfaces/IMatch';
import Match from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

const matchMock: IMatch = {
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 1,
  "awayTeam": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
  "teamHome": {
    "teamName": "São Paulo"
  },
  "teamAway": {
    "teamName": "Grêmio"
  }
};

const updateMock = {
  homeTeamGoals: 2,
  awayTeamGoals: 1
}


describe('Test endpoint Matches', () => {
  describe('List all matches', () => {
    beforeEach(() => {
      sinon.stub(Match, "findAll").resolves([matchMock as unknown as Match])
    })
    afterEach(() => {
      sinon.restore();
    })
    it('Should return array of matches with correct attributes', async () => {
      const response = await chai.request(app)
        .get('/matches')

      const [match] = response.body as IMatch[];

      expect(match.id).to.equal(matchMock.id);
      expect(match.homeTeam).to.equal(matchMock.homeTeam);
      expect(match.homeTeamGoals).to.equal(matchMock.homeTeamGoals);
      expect(match.awayTeam).to.equal(matchMock.awayTeam);
      expect(match.awayTeamGoals).to.equal(matchMock.awayTeamGoals);
      expect(match.inProgress).to.equal(matchMock.inProgress);
      expect(match.teamHome).to.deep.equal(matchMock.teamHome);
      expect(match.teamAway).to.deep.equal(matchMock.teamAway);
    })

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/matches')

      expect(response.status).to.equal(200)      
    })
    
  })
  describe('Match finished', async () => {
     beforeEach(() => {
      sinon.stub(Match, 'update').resolves();
    })
    afterEach(() => {
      sinon.restore();
    })
    it('should return status 200 and finished message', async () => {
      const response = await chai.request(app).patch('/matches/1/finish');
      expect(response).to.have.status(200);
      expect(response.body.message).to.be.equal('Finished');
    });

  });
   describe('Match can be edited returns 201', async () => {
    beforeEach(() => {
      sinon.stub(Match, 'update').resolves();
    })
    afterEach(() => {
      sinon.restore();
    })

   it('Succes', async () => {
    const response = await chai.request(app).patch('/matches/1').send(updateMock);
    expect(response.status).to.equal(201);
   })
 });

 describe('Match can be created', async () => {
    
  it('Succes', async () => {
    const response = await chai.request(app).post('/matches');

    expect(response.status).to.equal(201)
  })
});
})
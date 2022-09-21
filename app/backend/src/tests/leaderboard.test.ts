import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { homeMock } from './utils/homeMock';
import { awayMock } from './utils/awayMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Leaderbord/home endpoint', () => {
  it('Should return status 200', async () => {
    const lead = await chai.request(app).get('/leaderboard/home')
    expect(lead.status).to.be.eq(200);
    expect(lead.body).to.be.deep.eq(homeMock);
  });
});

describe('Test Leaderbord/away endpoint', () => {
    it('Should return status 200', async () => {
        const lead = await chai.request(app).get('/leaderboard/away')
        expect(lead.status).to.be.eq(200);
        expect(lead.body).to.be.deep.eq(awayMock);
    }
    );
});

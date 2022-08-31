import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import IUser from '../interfaces/IUser'
import JwtService from '../services/jwtService';


// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const loginMock: IUser = {
  email: 'admin@admin.com',
  password: 'admin-secret',
}

const badLoginMock : IUser = {
  email: 'not@admin.com',
  password: 'admin-secret',
}

const userMock : IUser = {
  id: 1,
  email: 'admin@admin.com',
  password: 'admin-secret',
  username: 'admin',
  role: 'admin',
}

describe('POST /login', () => {
  describe('Successful Login', () => {

    beforeEach(() => {
      sinon.stub(JwtService, "sign").returns('mock-token');
      sinon.stub(User, "findOne").resolves(userMock as User);
    })

    afterEach(() => { 
      sinon.restore();
    })

    it('should return status 200 and a valid token', async () => {
      const response = await chai.request(app)
      .post('/login')
      .send(loginMock)

      const token = response.body.token as string;

      expect(response.status).to.eq(200)
      expect(token).to.be.eq('mock-token')
    })
  })
  describe('Failed Login', () => {
    beforeEach(() => {
      sinon.stub(JwtService, "sign").returns('mock-token');
      sinon.stub(User, "findOne").resolves(badLoginMock as User);
    })

    afterEach(() => {
      sinon.restore();
    })
    
    it('should return status 401', async () => {
      const response = await chai.request(app)
      .post('/login')
      .send(badLoginMock)

      expect(response.status).to.equal(401);
    })
    it('should return error', async () => {
      const response = await chai.request(app)
      .post('./login')
      .send(badLoginMock)

      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Incorrect email or password');
    })
  })
});

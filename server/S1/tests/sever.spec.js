import { describe } from 'mocha';
import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../../index';

chai.use(chaihttp);
const { expect } = chai;


describe('server', ()=> {
  it('YAY!  Welcom to Teamwork !! Here to serve you fill free', (done)=> {
    chai.request(app)
      .get('/')
      .set('content-type', 'application/json')
      .end((err, res)=> {
        expect(res.status).to.equal(200);
        done();
      });
  });
});

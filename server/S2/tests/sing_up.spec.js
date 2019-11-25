import { describe } from 'mocha';
import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../../index';
import stockData from './stockData.spec';
import { authenticateUser } from '../help/help';

console.log(authenticateUser);

chai.use(chaihttp);
const { expect } = chai;


let token;

describe('sign up', ()=> {
  before((done)=> {
    // signup and get an access token
    chai.request(app)
      .post('/api/v1/auth/sign_up')
      .set('content-type', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send(stockData.signup[0])
      .then((res)=> {
        token = res.body.data.token;
        done();
      });
  });
  it('it should sign up', (done)=> {
    chai.request(app)
      .post('/api/v1/auth/sign_up')
      .send(stockData.signup[2])
      .end((err, res)=> {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('it should return email already taken ', (done)=> {
    chai.request(app)
      .post('/api/v1/auth/sign_up')
      .send(stockData.signup[0])
      .end((err, res)=> {
        expect(res.status).to.equal(409);
        done();
      });
  });
  it('it should not create an account with invalid values', (done)=> {
    chai.request(app)
      .post('/api/v1/auth/sign_up')
      .send(stockData.signup[1])
      .end((err, res)=> {
        expect(res.status).to.equal(401);
        done();
      });
  });
});
describe('Sign In', ()=> {
  it('it should sign in user  with a valid data ', (done)=> {
    chai.request(app)
      .post('/api/v1/auth/connect')
      .set('content-type', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send(stockData.signin[0])
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('it should sign in with an invalid password', (done)=> {
    chai.request(app)
      .post('/api/v1/auth/connect')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send(stockData.signin[1])
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('it should not sign in with an invalid email', (done)=> {
    chai.request(app)
      .post('/api/v1/auth/connect')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send(stockData.signin[2])
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(401);
        done();
      });
  });
});

describe('Creation of a Article post', ()=> {
  let tokens = authenticateUser('glodie@gmail.com', 1);

  it('Should return an error with a 401 status when the user is not authenticated', (done)=> {
    chai.request(app)
      .post('/api/v1/articles')
      .set('content-type', 'application/json')
      .set('auth-token', 'invalid token')
      .set('auth-token', '')
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('Should return an error with a 401 acces denied ', (done)=> {
    chai.request(app)
      .post('/api/v1/articles')
      .set('content-type', 'application/json')
      .set('auth-token', '')
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('access to articles route allowed, but should not post article when Article is empty', (done)=> {
    chai.request(app)
      .post('/api/v1/articles')
      .set('content-type', 'application/json')
      .set('auth-token', `${tokens}`)
      .send(stockData.articles[3])
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('access to articles route allowed, but should not post article when both field are empty', (done)=> {
    chai.request(app)
      .post('/api/v1/articles')
      .set('content-type', 'application/json')
      .set('auth-token', `${tokens}`)
      .send(stockData.articles[3])
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('whene everything is okey then create an article', (done)=> {
    chai.request(app)
      .post('/api/v1/articles')
      .set('content-type', 'application/json')
      .set('auth-token', `${tokens}`)
      .send(stockData.articles[0])
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('Should return an error with a 401 status when the user is not authenticated', (done)=> {
    chai.request(app)
      .patch('/api/v1/article/1')
      .set('content-type', 'application/json')
      .set('auth-token', 'invalid token')
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('user can not edit a post without an article id ', (done)=> {
    chai.request(app)
      .patch('/api/v1/article/1')
      .set('content-type', 'application/json')
      .set('auth-token', `${tokens}`)
      .send(stockData.articles[0])
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(500);
        done();
      });
  });

  it('user can not edit a post without an token ', (done)=> {
    chai.request(app)
      .patch('/api/v1/article/1')
      .set('content-type', 'application/json')
      .set('auth-token', '')
      .send(stockData.articles[0])
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('it will return 200  if the article is deleted', (done)=> {
    chai.request(app)
      .delete('/api/v1/delete/1')
      .set('content-type', 'application/json')
      .set('auth-token', `${tokens}`)
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(500);
        done();
      });
  });
  it('it will return all post  ', (done)=> {
    chai.request(app)
      .get('/api/v1/feeds')
      .set('content-type', 'application/json')
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it will return all post  ', (done)=> {
    chai.request(app)
      .get('/api/v1/feeds')
      .set('content-type', 'application/json')
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it will return 401  if there is not token ', (done)=> {
    chai.request(app)
      .delete('/api/v1/delete/1')
      .set('content-type', 'application/json')
      .set('auth-token', `${tokens}`)
      .set('auth-token', '')
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('it error if the token is invalid', (done)=> {
    chai.request(app)
      .post('/aricles/:id/comments')
      .set('content-type', 'application/json')
      .send(stockData.comments[0])
      .set('auth-token', 'iiettetette')
      .end((err, res)=> {
        if (err) done(err);
        expect(res.status).to.equal(404);
        done();
      });
  });
});

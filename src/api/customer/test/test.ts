import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../../app';
import * as CustomerFixtures from './fixtures';

chai.use(chaiHttp);

describe('Customer Routes', () => {
  it('should successfully login a customer', (done) => {
    chai.request(app)
      .post('/customer/login')
      .send(CustomerFixtures.customerLogin)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Login successful');
        done();
      });
  });
    it('should throw an error if the email is incorrect', (done) => {
        chai.request(app)
          .post('/customer/login')
          .send(CustomerFixtures.incorrectEmail)
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.equal('Incorrect login details');
            done();
          });
      });
    it('should throw an error if the password is incorrect', (done) => {
        chai.request(app)
          .post('/customer/login')
          .send(CustomerFixtures.incorrectPassword)
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.equal('Incorrect login details');
            done();
          });
      });
}
)
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../../app';
import { customerLogin } from './fixtures';

chai.use(chaiHttp);

describe('Billing Routes', () => {
    it('should successfully login a customer', (done) => {
        chai.request(app)
          .post('/customer/login')
          .send(customerLogin)
          .end((err, res) => {
            process.env.CUSTOMER_TOKEN = res.body.data.token;
            expect(res.body.status).to.equal('success');
            expect(res.body.message).to.equal('Login successful');
            done();
          });
      });

    it('should successfully fund a customers account', (done) => {
        chai.request(app)
          .post('/billing/fund')
          .set('Authorization', `Bearer ${process.env.CUSTOMER_TOKEN}`)
          .send({ amount: 500})
          .end((err, res) => {            
            expect(res.body.status).to.equal('success');
            expect(res.body.message).to.equal('Billing request created successfully');
            done();
          });
      });
}

)
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../controllers/authController');
const expect = chai.expect;

chai.use(chaiHttp);

describe('AuthController', () => {
    it('should return status 200 on successful sign up', async () => {
        const res = await chai
            .request(app)
            .post('/signUp')
            .send({
                nome: 'Julio Oliveira',
                email: 'julio@exemplo.com',
                senha:'senhasegura',
                telefones: [{ numero: '123456789', ddd:'11'}],
            });
        expect(res).to.have.status(200);
        expect(res.body).property('token');
    });
})
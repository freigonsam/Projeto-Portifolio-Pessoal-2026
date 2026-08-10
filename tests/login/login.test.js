const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');
const fixtures = require('../fixtures/notesFixtures');

describe('Endpoint /login', () => {
  it('deve autenticar com credenciais válidas', async () => {
    const response = await request(app)
      .post('/login')
      .send(fixtures.validCredentials);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
    expect(response.body.token).to.be.a('string');
  });

  it('deve rejeitar credenciais inválidas', async () => {
    const response = await request(app)
      .post('/login')
      .send(fixtures.invalidCredentials);

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('Credenciais inválidas');
  });

  it('deve rejeitar login sem body', async () => {
    const response = await request(app)
      .post('/login');

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('Credenciais inválidas');
  });

  it('deve rejeitar método não permitido no login', async () => {
    const response = await request(app)
      .get('/login');

    expect(response.status).to.equal(404);
  });

  it('deve bloquear login após várias tentativas inválidas', async () => {
    for (let i = 0; i < 3; i += 1) {
      await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'senha-errada' });
    }

    const response = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'senha-errada' });

    expect(response.status).to.equal(429);
    expect(response.body.message).to.equal('Muitas tentativas. Tente novamente mais tarde');
  });
});

const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');

describe('Middleware de autenticação', () => {
  it('deve retornar mensagem clara para token malformado', async () => {
    const response = await request(app)
      .get('/notes')
      .set('Authorization', 'Bearer');

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('Token malformado');
  });

  it('deve retornar mensagem clara para token expirado', async () => {
    const response = await request(app)
      .get('/notes')
      .set('Authorization', 'Bearer eyJhbGciOiJub25lIn0.eyJ1c2VybmFtZSI6ImFkbWluIiwidHlwIjoiY29uZmlnIn0.');

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('Token inválido');
  });
});

const request = require('supertest');
const app = require('../../src/app');
const fixtures = require('../fixtures/notesFixtures');

async function loginAndGetToken() {
  const response = await request(app)
    .post('/login')
    .send(fixtures.validCredentials);

  if (response.status !== 200) {
    throw new Error('Falha ao realizar login para os testes');
  }

  return response.body.token;
}

module.exports = {
  loginAndGetToken
};

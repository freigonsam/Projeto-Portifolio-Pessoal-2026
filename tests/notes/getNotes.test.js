const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');
const fixtures = require('../fixtures/notesFixtures');
const { loginAndGetToken } = require('../helpers/authHelper');
const { resetNoteService } = require('../helpers/testState');

class GetNotesTests {
  register() {
    describe('GET /notes', () => {
      let token;

      beforeEach(async () => {
        resetNoteService();
        token = await loginAndGetToken();
      });

      it('deve listar as notas cadastradas', async () => {
        await request(app)
          .post('/notes')
          .set('Authorization', `Bearer ${token}`)
          .send(fixtures.validNote);

        const response = await request(app)
          .get('/notes')
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).to.equal(200);
        expect(response.body.notes).to.be.an('array');
        expect(response.body.notes).to.have.lengthOf(1);
      });

      it('deve buscar uma nota por id', async () => {
        const created = await request(app)
          .post('/notes')
          .set('Authorization', `Bearer ${token}`)
          .send(fixtures.validNote);

        const response = await request(app)
          .get(`/notes/${created.body.note.id}`)
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).to.equal(200);
        expect(response.body.note.id).to.equal(created.body.note.id);
        expect(response.body.note.title).to.equal(fixtures.validNote.title);
      });

      it('deve retornar 404 ao buscar uma nota inexistente', async () => {
        const response = await request(app)
          .get('/notes/999')
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Bloco de notas não encontrado');
      });

      it('deve rejeitar busca sem token', async () => {
        const response = await request(app)
          .get('/notes');

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Token não fornecido');
      });
    });
  }
}

const getNotesTests = new GetNotesTests();
getNotesTests.register();

module.exports = getNotesTests;

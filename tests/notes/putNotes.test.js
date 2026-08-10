const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');
const fixtures = require('../fixtures/notesFixtures');
const { loginAndGetToken } = require('../helpers/authHelper');
const { resetNoteService } = require('../helpers/testState');

class PutNotesTests {
  register() {
    describe('PUT /notes', () => {
      let token;

      beforeEach(async () => {
        resetNoteService();
        token = await loginAndGetToken();
      });

      it('deve atualizar uma nota existente', async () => {
        const created = await request(app)
          .post('/notes')
          .set('Authorization', `Bearer ${token}`)
          .send(fixtures.validNote);

        const response = await request(app)
          .put(`/notes/${created.body.note.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(fixtures.updatedNote);

        expect(response.status).to.equal(200);
        expect(response.body.note.title).to.equal(fixtures.updatedNote.title);
        expect(response.body.note.content).to.equal(fixtures.updatedNote.content);
      });

      it('deve retornar 404 ao atualizar uma nota inexistente', async () => {
        const response = await request(app)
          .put('/notes/999')
          .set('Authorization', `Bearer ${token}`)
          .send(fixtures.updatedNote);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Bloco de notas não encontrado');
      });

      it('deve rejeitar atualização com token inválido', async () => {
        const response = await request(app)
          .put('/notes/1')
          .set('Authorization', 'Bearer token-invalido')
          .send(fixtures.updatedNote);

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Token inválido');
      });

      it('deve aceitar atualização parcial com apenas um campo', async () => {
        const created = await request(app)
          .post('/notes')
          .set('Authorization', `Bearer ${token}`)
          .send(fixtures.validNote);

        const response = await request(app)
          .put(`/notes/${created.body.note.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ title: 'Título parcial' });

        expect(response.status).to.equal(200);
        expect(response.body.note.title).to.equal('Título parcial');
        expect(response.body.note.content).to.equal(fixtures.validNote.content);
      });

      it('deve rejeitar atualização sem token', async () => {
        const response = await request(app)
          .put('/notes/1')
          .send(fixtures.updatedNote);

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Token não fornecido');
      });
    });
  }
}

const putNotesTests = new PutNotesTests();
putNotesTests.register();

module.exports = putNotesTests;

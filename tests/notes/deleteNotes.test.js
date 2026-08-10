const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');
const fixtures = require('../fixtures/notesFixtures');
const { loginAndGetToken } = require('../helpers/authHelper');
const { resetNoteService } = require('../helpers/testState');

class DeleteNotesTests {
  register() {
    describe('DELETE /notes', () => {
      let token;

      beforeEach(async () => {
        resetNoteService();
        token = await loginAndGetToken();
      });

      it('deve remover uma nota existente', async () => {
        const created = await request(app)
          .post('/notes')
          .set('Authorization', `Bearer ${token}`)
          .send(fixtures.validNote);

        const response = await request(app)
          .delete(`/notes/${created.body.note.id}`)
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Bloco de notas removido com sucesso');
      });

      it('deve retornar 404 ao remover uma nota inexistente', async () => {
        const response = await request(app)
          .delete('/notes/999')
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Bloco de notas não encontrado');
      });

      it('deve rejeitar delete sem token', async () => {
        const response = await request(app)
          .delete('/notes/1');

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Token não fornecido');
      });
    });
  }
}

const deleteNotesTests = new DeleteNotesTests();
deleteNotesTests.register();

module.exports = deleteNotesTests;

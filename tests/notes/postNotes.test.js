const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');
const fixtures = require('../fixtures/notesFixtures');
const { loginAndGetToken } = require('../helpers/authHelper');
const { resetNoteService } = require('../helpers/testState');

class PostNotesTests {
  register() {
    describe('POST /notes', () => {
      let token;

      beforeEach(async () => {
        resetNoteService();
        token = await loginAndGetToken();
      });

      it('deve criar uma nota com dados válidos', async () => {
        const response = await request(app)
          .post('/notes')
          .set('Authorization', `Bearer ${token}`)
          .send(fixtures.validNote);

        expect(response.status).to.equal(201);
        expect(response.body.note).to.have.property('id');
        expect(response.body.note.title).to.equal(fixtures.validNote.title);
        expect(response.body.note.content).to.equal(fixtures.validNote.content);
      });

      it('deve impedir a criação sem token', async () => {
        const response = await request(app)
          .post('/notes')
          .send(fixtures.validNote);

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Token não fornecido');
      });

      it('deve rejeitar a criação com payload inválido', async () => {
        const response = await request(app)
          .post('/notes')
          .set('Authorization', `Bearer ${token}`)
          .send(fixtures.invalidNote);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Título e conteúdo são obrigatórios');
      });

      it('deve rejeitar a criação sem título', async () => {
        const response = await request(app)
          .post('/notes')
          .set('Authorization', `Bearer ${token}`)
          .send(fixtures.noteWithoutTitle);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Título e conteúdo são obrigatórios');
      });

      it('deve rejeitar a criação sem conteúdo', async () => {
        const response = await request(app)
          .post('/notes')
          .set('Authorization', `Bearer ${token}`)
          .send(fixtures.noteWithoutContent);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Título e conteúdo são obrigatórios');
      });

      it('deve rejeitar título com menos de 3 caracteres', async () => {
        const response = await request(app)
          .post('/notes')
          .set('Authorization', `Bearer ${token}`)
          .send(fixtures.shortTitle);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Título deve ter entre 3 e 20 caracteres');
      });

      it('deve rejeitar título com mais de 20 caracteres', async () => {
        const response = await request(app)
          .post('/notes')
          .set('Authorization', `Bearer ${token}`)
          .send(fixtures.longTitle);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Título deve ter entre 3 e 20 caracteres');
      });

      it('deve rejeitar conteúdo com menos de 3 caracteres', async () => {
        const response = await request(app)
          .post('/notes')
          .set('Authorization', `Bearer ${token}`)
          .send(fixtures.shortContent);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Conteúdo deve ter entre 3 e 200 caracteres');
      });

      it('deve rejeitar conteúdo com mais de 200 caracteres', async () => {
        const response = await request(app)
          .post('/notes')
          .set('Authorization', `Bearer ${token}`)
          .send(fixtures.longContent);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Conteúdo deve ter entre 3 e 200 caracteres');
      });
    });
  }
}

const postNotesTests = new PostNotesTests();
postNotesTests.register();

module.exports = postNotesTests;

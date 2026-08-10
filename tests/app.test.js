const request = require('supertest');
const app = require('../src/app');

describe('API de blocos de notas', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: '123456' });
    token = res.body.token;
  });

  it('deve criar um bloco de notas', async () => {
    const res = await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Nota 1', content: 'Conteúdo da nota' });

    expect(res.status).toBe(201);
    expect(res.body.note).toHaveProperty('id');
    expect(res.body.note.title).toBe('Nota 1');
  });

  it('deve listar todos os blocos de notas', async () => {
    const res = await request(app)
      .get('/notes')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.notes)).toBe(true);
  });

  it('deve buscar um bloco de notas por id', async () => {
    const res = await request(app)
      .get('/notes/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.note.id).toBe(1);
  });

  it('deve atualizar um bloco de notas', async () => {
    const res = await request(app)
      .put('/notes/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Nota atualizada', content: 'Conteúdo atualizado' });

    expect(res.status).toBe(200);
    expect(res.body.note.title).toBe('Nota atualizada');
  });

  it('deve negar acesso sem token', async () => {
    const res = await request(app)
      .get('/notes');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Token não fornecido');
  });
});

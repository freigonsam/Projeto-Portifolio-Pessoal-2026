module.exports = {
  validCredentials: {
    username: 'admin',
    password: '123456'
  },
  invalidCredentials: {
    username: 'admin',
    password: 'senha-errada'
  },
  validNote: {
    title: 'Nota de teste',
    content: 'Conteúdo de teste'
  },
  updatedNote: {
    title: 'Nota atualizada',
    content: 'Conteúdo atualizado'
  },
  invalidNote: {
    title: '',
    content: ''
  },
  noteWithoutTitle: {
    content: 'Conteúdo sem título'
  },
  noteWithoutContent: {
    title: 'Título sem conteúdo'
  },
  shortTitle: {
    title: 'ab',
    content: 'Conteúdo válido'
  },
  longTitle: {
    title: 'Título com mais de vinte caracteres',
    content: 'Conteúdo válido'
  },
  shortContent: {
    title: 'Título válido',
    content: 'ab'
  },
  longContent: {
    title: 'Título válido',
    content: 'a'.repeat(201)
  },
  duplicateTitle: {
    title: 'Nota de teste',
    content: 'Outro conteúdo válido'
  },
  emptyBody: {}
};

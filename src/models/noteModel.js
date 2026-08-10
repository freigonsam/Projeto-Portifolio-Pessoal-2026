class NoteModel {
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = NoteModel;

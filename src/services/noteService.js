const NoteModel = require('../models/noteModel');

class NoteService {
  constructor() {
    this.notes = [];
    this.nextId = 1;
  }

  createNote(title, content) {
    const note = new NoteModel(this.nextId++, title, content);
    this.notes.push(note);
    return note;
  }

  getAllNotes() {
    return this.notes;
  }

  getNoteById(id) {
    return this.notes.find((note) => note.id === Number(id));
  }

  updateNote(id, title, content) {
    const note = this.getNoteById(id);
    if (!note) {
      return null;
    }

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    note.updatedAt = new Date().toISOString();
    return note;
  }

  deleteNote(id) {
    const noteIndex = this.notes.findIndex((note) => note.id === Number(id));

    if (noteIndex === -1) {
      return null;
    }

    const [deletedNote] = this.notes.splice(noteIndex, 1);
    return deletedNote;
  }
}

module.exports = new NoteService();

const noteService = require('../services/noteService');

class NoteController {
  createNote(req, res) {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Título e conteúdo são obrigatórios' });
    }

    if (title.trim().length < 3 || title.trim().length > 20) {
      return res.status(400).json({ message: 'Título deve ter entre 3 e 20 caracteres' });
    }

    if (content.trim().length < 3 || content.trim().length > 200) {
      return res.status(400).json({ message: 'Conteúdo deve ter entre 3 e 200 caracteres' });
    }

    const note = noteService.createNote(title, content);
    return res.status(201).json({ note });
  }

  listNotes(req, res) {
    const notes = noteService.getAllNotes();
    return res.status(200).json({ notes });
  }

  getNote(req, res) {
    const note = noteService.getNoteById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Bloco de notas não encontrado' });
    }

    return res.status(200).json({ note });
  }

  updateNote(req, res) {
    const { title, content } = req.body;
    const note = noteService.updateNote(req.params.id, title, content);

    if (!note) {
      return res.status(404).json({ message: 'Bloco de notas não encontrado' });
    }

    return res.status(200).json({ note });
  }

  deleteNote(req, res) {
    const note = noteService.deleteNote(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Bloco de notas não encontrado' });
    }

    return res.status(200).json({ message: 'Bloco de notas removido com sucesso' });
  }
}

module.exports = new NoteController();

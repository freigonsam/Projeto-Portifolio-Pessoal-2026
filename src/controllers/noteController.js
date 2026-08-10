const noteService = require('../services/noteService');

function sendValidationError(res, message) {
  return res.status(400).json({ message });
}

class NoteController {
  createNote(req, res) {
    const { title, content } = req.body || {};

    if (title === undefined || content === undefined) {
      return sendValidationError(res, 'Título e conteúdo são obrigatórios');
    }

    if (typeof title !== 'string' || typeof content !== 'string') {
      return sendValidationError(res, 'Dados inválidos');
    }

    if (!title.trim() || !content.trim()) {
      return sendValidationError(res, 'Título e conteúdo são obrigatórios');
    }

    if (title.trim().length < 3 || title.trim().length > 20) {
      return sendValidationError(res, 'Título deve ter entre 3 e 20 caracteres');
    }

    if (content.trim().length < 3 || content.trim().length > 200) {
      return sendValidationError(res, 'Conteúdo deve ter entre 3 e 200 caracteres');
    }

    if (noteService.existsByTitle(title.trim())) {
      return sendValidationError(res, 'Já existe uma nota com este título');
    }

    const note = noteService.createNote(title.trim(), content.trim());
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
    const { title, content } = req.body || {};

    if (title === undefined && content === undefined) {
      return sendValidationError(res, 'Informe pelo menos um campo para atualização');
    }

    if (title !== undefined && typeof title !== 'string') {
      return sendValidationError(res, 'Dados inválidos');
    }

    if (content !== undefined && typeof content !== 'string') {
      return sendValidationError(res, 'Dados inválidos');
    }

    if (title !== undefined && !title.trim()) {
      return sendValidationError(res, 'Título e conteúdo são obrigatórios');
    }

    if (content !== undefined && !content.trim()) {
      return sendValidationError(res, 'Título e conteúdo são obrigatórios');
    }

    if (title !== undefined && (title.trim().length < 3 || title.trim().length > 20)) {
      return sendValidationError(res, 'Título deve ter entre 3 e 20 caracteres');
    }

    if (content !== undefined && (content.trim().length < 3 || content.trim().length > 200)) {
      return sendValidationError(res, 'Conteúdo deve ter entre 3 e 200 caracteres');
    }

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

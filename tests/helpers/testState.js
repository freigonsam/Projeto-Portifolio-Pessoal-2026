const noteService = require('../../src/services/noteService');

function resetNoteService() {
  noteService.notes = [];
  noteService.nextId = 1;
}

module.exports = {
  resetNoteService
};

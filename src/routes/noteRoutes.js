const express = require('express');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.all('/login', (req, res, next) => {
  if (req.method === 'POST') {
    return next();
  }

  return res.status(404).json({ message: 'Método não permitido' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  if (username === 'admin' && password === '123456') {
    const token = require('jsonwebtoken').sign({ username }, 'segredo', { expiresIn: '1h' });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: 'Credenciais inválidas' });
});

router.use(authMiddleware);

router.post('/notes', noteController.createNote);
router.get('/notes', noteController.listNotes);
router.get('/notes/:id', noteController.getNote);
router.put('/notes/:id', noteController.updateNote);
router.delete('/notes/:id', noteController.deleteNote);

module.exports = router;

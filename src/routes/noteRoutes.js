const express = require('express');
const jwt = require('jsonwebtoken');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const loginAttempts = new Map();
const MAX_LOGIN_ATTEMPTS = 3;
const LOGIN_BLOCK_TIME_MS = 5 * 60 * 1000;

function isBlocked(username) {
  const attempts = loginAttempts.get(username);

  if (!attempts) {
    return false;
  }

  if (Date.now() - attempts.firstAttemptAt > LOGIN_BLOCK_TIME_MS) {
    loginAttempts.delete(username);
    return false;
  }

  return attempts.count >= MAX_LOGIN_ATTEMPTS;
}

function registerFailedAttempt(username) {
  const attempts = loginAttempts.get(username) || { count: 0, firstAttemptAt: Date.now() };
  attempts.count += 1;
  attempts.firstAttemptAt = attempts.firstAttemptAt || Date.now();
  loginAttempts.set(username, attempts);
}

function clearAttempts(username) {
  loginAttempts.delete(username);
}

function resetLoginAttempts() {
  loginAttempts.clear();
}

router.all('/login', (req, res, next) => {
  if (req.method === 'POST') {
    return next();
  }

  return res.status(404).json({ message: 'Método não permitido' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const normalizedUsername = username || 'unknown';

  if (isBlocked(normalizedUsername)) {
    return res.status(429).json({ message: 'Muitas tentativas. Tente novamente mais tarde' });
  }

  if (username === 'admin' && password === '123456') {
    clearAttempts(normalizedUsername);
    const token = jwt.sign({ username }, 'segredo', { expiresIn: '1h' });
    return res.status(200).json({ token });
  }

  registerFailedAttempt(normalizedUsername);
  return res.status(401).json({ message: 'Credenciais inválidas' });
});

router.use(authMiddleware);

router.post('/notes', noteController.createNote);
router.get('/notes', noteController.listNotes);
router.get('/notes/:id', noteController.getNote);
router.put('/notes/:id', noteController.updateNote);
router.delete('/notes/:id', noteController.deleteNote);

router.resetLoginAttempts = resetLoginAttempts;

module.exports = router;

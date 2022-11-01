const express = require('express');
const router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/auth');
const musicsCtrl = require('../controllers/musics');

router.get('/musics/new', isLoggedIn, musicsCtrl.new);
router.post('/games/:id/musics', isLoggedIn, musicsCtrl.create);
router.put('/musics/:id', isLoggedIn, musicsCtrl.update);
router.delete('/musics/:id', isLoggedIn, musicsCtrl.delete);

module.exports = router;
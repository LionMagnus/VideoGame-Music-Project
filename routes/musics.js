const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const musicsCtrl = require('../controllers/musics');

router.get('/games/:id/musics/new', ensureLoggedIn, musicsCtrl.new);
router.get('/musics/:id', musicsCtrl.show);
router.post('/games/:id/musics', ensureLoggedIn, musicsCtrl.create);
router.delete('/games/:id/musics/:id', ensureLoggedIn, musicsCtrl.delete);

module.exports = router;
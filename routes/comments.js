const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/comments/:id/edit', ensureLoggedIn, commentsCtrl.edit);
router.post('/musics/:id/comments', ensureLoggedIn, commentsCtrl.create);
router.put('/comments/:id', ensureLoggedIn, commentsCtrl.update);
router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete);

module.exports = router;
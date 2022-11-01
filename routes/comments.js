const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All routes "starts with" / (root)

// POST /musics/:id/comments
router.post('/musics/:id/comments', ensureLoggedIn, commentsCtrl.create);
// DELETE /comments/:id
router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete);

module.exports = router;
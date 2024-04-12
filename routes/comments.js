const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.post('/books/:id/comments', ensureLoggedIn, commentsCtrl.create);

router.get('/books/:id/comments/edit', ensureLoggedIn, commentsCtrl.edit);

router.put('/comments/:id', ensureLoggedIn, commentsCtrl.update);

router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete);


module.exports = router;

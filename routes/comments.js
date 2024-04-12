const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.post('/books/:id/comments', commentsCtrl.create);

router.get('/books/:id/comments/edit', commentsCtrl.edit);

router.put('/comments/:id', commentsCtrl.update);

router.delete('/comments/:id', commentsCtrl.delete);


module.exports = router;

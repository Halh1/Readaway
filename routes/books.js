const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books')
const ensureLoggedIn = require('../config/ensureLoggedIn');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

//GET /books
router.get('/', ensureLoggedIn, booksCtrl.index);

router.get('/new', ensureLoggedIn, booksCtrl.new);

router.post('/new',  ensureLoggedIn, booksCtrl.create);

router.get('/:id', ensureLoggedIn, booksCtrl.show);

router.delete('/:id', ensureLoggedIn, booksCtrl.delete);




module.exports = router;

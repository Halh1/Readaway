const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books')

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

//GET /books
router.get('/', booksCtrl.index);

router.get('/new', booksCtrl.new);

router.post('/new', booksCtrl.create);

router.get('/:id', booksCtrl.show);




module.exports = router;

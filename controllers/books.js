const Book = require('../models/book');

module.exports = {
    index,
    new: newBook,
    create,
    show
}

async function index(req, res) {
    const books = await Book.find({});
    res.render('books/index', { title: 'Your Books', books});

}

async function show(req, res) {
    const book = await Book.findById(req.params.id);
    //console.log(book);
    res.render('books/show', {title: 'Book Detail', book });
}

function newBook(req, res) {
    res.render('books/new', { title: 'Add Book', errorMsg: ''});
}

async function create(req, res) {

    req.body.hardcover = !!req.body.hardcover;
    for(let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    
    try{
        const book = await Book.create(req.body);
        res.redirect(`/books/${book._id}`);

    } catch (err) {
        console.log(err);
        res.render('books/new', {errorMsg: err.message});
    }

}
const Book = require('../models/book');

module.exports = {
    create,
    delete: deleteComment
}

async function deleteComment(req, res) {
    console.log('test');
    const book = await Book.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id });
    console.log('hi', book);
    if(!book) return res.redirect(`/books/${book._id}`);

    book.comments.remove(req.params.id);

    await book.save();

    res.redirect(`/books/${book._id}`);
}


async function create(req, res) {
    const book = await Book.findById(req.params.id);
    console.log("hi", book)
    req.body.user = req.user.id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    book.comments.push(req.body);
    try {
        await book.save();
    }   catch(err) {
        console.log(err);
    }
    res.redirect(`/books/${book._id}`);
}


/* const book = await Book.findOne({ 'comments._id': req.params.id, 'comments.userId': req.user._id });
    if(!book) return res.redirect(`/books/${book._id}`);

    book.comments.remove(req.params.id);

    await book.save();*/
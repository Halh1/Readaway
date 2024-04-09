const Book = require('../models/book');

module.exports = {
    create
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
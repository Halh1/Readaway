const Book = require('../models/book');

module.exports = {
    create,
    delete: deleteComment,
    edit,
    update
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

async function edit(req, res) {
    const book = await Book.findOne({ 'comments._id':req.params.id });
    console.log('hi', book);
    const comment = book.comments.id(req.params.id);
    console.log("comment", comment);
    res.render('comments/edit', { title: 'Edit Comment', book, comment });
}


async function update(req, res) {
    const book = await Book.findOne({ 'comments._id':req.params.id });
    const comment = book.comments.id(req.params.id);
    console.log("before", comment);
    console.log(req.user._id);

    if (comment.user.equals(req.user._id)) {
        comment.content = req.body.content;
        await comment.save();
        await book.save(); 
        console.log("after", comment);
    }
    
    res.redirect(`/books/${book._id}`);
}
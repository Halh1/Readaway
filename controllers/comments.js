const Book = require('../models/book');

module.exports = {
    create,
    delete: deleteComment,
    edit,
    update
}

async function deleteComment(req, res) {
    const book = await Book.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id });

    if(!book) return res.redirect(`/books/${book._id}`);

    book.comments.remove(req.params.id);

    await book.save();

    res.redirect(`/books/${book._id}`);
}


async function create(req, res) {
    const book = await Book.findById(req.params.id);

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
   
    const comment = book.comments.id(req.params.id);
    
    res.render('comments/edit', { title: 'Edit Comment', book, comment });
}


async function update(req, res) {
    const book = await Book.findOne({ 'comments._id':req.params.id });
    const comment = book.comments.id(req.params.id);
    

    if (comment.user.equals(req.user._id)) {
        comment.content = req.body.content;
        await comment.save();
        await book.save(); 
    }
    
    res.redirect(`/books/${book._id}`);
}
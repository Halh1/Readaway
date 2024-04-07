const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishYear: {
        type: Number,
        default: function () {
            return new Date().getFullYear();
        },
        required: true
    },
    hardcover: {
        type: Boolean,
        default: true
    },
    genre: {
        type: String,
        enum: ['YA', 'Fantasy', 'Historical Fiction', 'Thriller', 'Mystery', 'Graphic Novel', 'Non-Fiction'],  
    }
});

module.exports = mongoose.model('Book', bookSchema);
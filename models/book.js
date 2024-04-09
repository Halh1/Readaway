const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

/*const statusSchema = new Schema ({
    status: {
        type: String,
        enum: ['Current Read', 'To Be Read', 'Completed']
    }
})*/
const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    readStatus: {
        type: String,
        enum: ['Current Read', 'To Be Read', 'Completed'],
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    userName: String,
    userAvatar: String
}, {
    timestamps: true
})

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
    genre: {
        type: String,
        enum: ['YA', 'Fantasy', 'Historical Fiction', 'Thriller', 'Mystery', 'Graphic Novel', 'Non-Fiction'],  
    },
    hardcover: {
        type: Boolean,
        default: true
    },
    comments: [commentSchema]
    //readStatus: [statusSchema]
});

module.exports = mongoose.model('Book', bookSchema);
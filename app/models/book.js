const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    status: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema, 'books');
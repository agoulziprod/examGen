const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Question = new Schema({
    question: {
        type: String,
        required: true
    },
    hasOrder: {
        type: Boolean,
        required: true,
        default: false
    },
    type: {
        required: true,
        type: String,
        default: 'radio'
    },
    creator: {
        type: String,
        required: true
    },
    test: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('question', Question);
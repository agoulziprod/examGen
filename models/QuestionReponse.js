const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const QuestionReponse = new Schema({
    reponse: {
        type: String,
        required: true
    },
    isTrue: {
        type: Boolean,
        required: true,
        default: false
    },
    question: {
        type: String,
        required: true
    },
    // test: {
    //     type: String,
    //     required: true
    // },
    creator: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('questionReponse', QuestionReponse);
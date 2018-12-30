const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TestInstance = new Schema({
    test: {
        type: String,
        required: true
    },
    questions: [{
        questionId: String,
        question: String,
        type: String,
        questionReponses:
            [{
                reponse: String,
                isTrue: String
            }]
    }]
    ,
    apprenant: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    lengh: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('testInstance', TestInstance);
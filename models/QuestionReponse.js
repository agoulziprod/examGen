const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const QuestionReponse = new Schema({
    reponse: {
        //reponse lli ghatkon mktoba
        type: String,
        required: true
    },
    isTrue: {
        // wach had la reonse s7i7a ila khtarha student
        type: Boolean,
        required: true,
        default: false
    },
    question: {
        //id for the question
        type: String,
        required: true
    },
    // test: {
    //     type: String,
    //     required: true
    // },
    creator: {
        // prof lli create had la rep : gha bach nsahal jointure o safi, manbqach ghadi jay l base de données :) 
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('questionReponse', QuestionReponse);
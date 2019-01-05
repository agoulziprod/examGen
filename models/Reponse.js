const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Reponses = new Schema({
    test: {
        type: String,
        required: true
    },
    testInstance: {
        type: String,
        required: true
    },
    apprenant: {
        type: String,
        required: true
    },
    reponses: [{/*
        hna normalement Map fiha id1:id2 .. id1 dial Question o id2 dial reponses séléctionné
         .. ms since mongoose 4 dosen't support Map object i'll use the array and i'll cnvert it back and ford
        */
    }]

});

mongoose.model('reponses', Reponses);
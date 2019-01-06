const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TestInstance = new Schema({
    test: {
        type: String,
        required: true
    },
    questions: [{/*
        hadchi 3lach commentito 7it dba kigolia chi error f casting o ana nkhalih type any o khalina hanyyyne b roujoula
        _id: String,
        question: String,
        type: String,
        questionReponses:
            [{
                _id: String,
                reponse: String,
                isTrue: String
            }]*/
    }]
    ,
    apprenant: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        
    },
    //hadi hia number dial questions
    length: {
        type: Number,
        required: true
    },
    //o hadi hia duree dialo mafia lli ymchi htal test nqder n7tajha bzaaf lmarate
    duree: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('testInstance', TestInstance);
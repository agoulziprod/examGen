const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Empty4 = new Schema({ any: [{}] });
// Create Schema
const TestInstance = new Schema({
    test: {
        type: String,
        required: true
    },
    questions: [{/*
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
        default: 0
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
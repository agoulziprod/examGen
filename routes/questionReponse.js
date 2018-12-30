const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

// Load Test  and Question Model
require('../models/Test');
const Test = mongoose.model('tests');
require('../models/Question');
const Question = mongoose.model('question');
require('../models/QuestionReponse');
const QuestionReponse = mongoose.model('questionReponse');

function shuffle(array) {
    let currentIndex = array.length
        , temporaryValue
        , randomIndex
        ;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        //permuter lia les valeurs
        [array[randomIndex], array[currentIndex]] = [array[currentIndex], array[randomIndex]];
        /*
             temporaryValue = array[currentIndex];
             array[currentIndex] = array[randomIndex];
             array[randomIndex] = temporaryValue;
             */
    }
    return array;
}

// Question index page
/*
router.get('/details/:id/questions', ensureAuthenticated, (req, res) => {

    QuestionReponse.findOne({
        _id: req.params.id
    })
        .then(reponse => {
            if (reponse.creator != req.user.id) {
                req.flash('error_msg', `vous n'etes pas autorisé !`);
                res.redirect('/reponses');
            } else {
                Question.find({ reponse: req.params.id })
                    .sort({ date: 'desc' })
                    .then(questions => {
                        res.render('questions/index', {
                            question: questions,
                            reponse: reponse
                        });
                    });
            }
        });


});
*/


// Add QuestionReponse Form : done
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('questionReponses/add');
});


// Process Add Form :done
router.post('/:id', ensureAuthenticated, (req, res) => {
    let errors = [];
    if (!req.body.reponse)
        errors.push({ text: `veuillez ajouter un text au champs réponse` });

    if (errors.length > 0) {
        res.render('questionReponses/add', {
            errors: errors,
            _id: req.params.id
        });
    } else {
        const newQuestionReponse = {
            reponse: req.body.reponse,
            isTrue: Boolean(req.body.isTrue),
            question: req.params.id,
            creator: req.user.id,
        };

        new QuestionReponse(newQuestionReponse)
            .save()
            .then(questionRep => {
                req.flash('success_msg', 'La réponse a été ajoutée avec succées');
                // if only i can here have the test id so i make this redirect directly without using back
                // why because : whene i use the get methode and redirect it for the seconde time i lose the flash message
                res.redirect(`back`);
            })

    }
});

//just for redirection : done
router.get('/:id', ensureAuthenticated, (req, res) => {
    Question
        .findOne({ _id: req.params.id })
        .then(question => {
            let testId = question.test;
            // res.send(test);
            res.redirect(`/tests/details/${question.test}/questions`);
        })


    // 
})

// update


// Delete QuestionReponse
router.delete('/:id', ensureAuthenticated, (req, res) => {
    QuestionReponse.remove({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'La réponse a été supprimée avec succès');
            res.redirect('back');

        });
});

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

// Load Test  and Question Model
require('../models/Test');
const Test = mongoose.model('tests');
require('../models/Question');
const Question = mongoose.model('question');





// Process Add Form

router.post('/', ensureAuthenticated, (req, res) => {

    let errors = [];

    if (!req.body.question) {
        errors.push({ text: `veuillez ajouter une question à votre question` });
    }
    // if(!req.body.hasOrder){
    //   errors.push({text:`veuillez indiquer si votre test contient des réponses ordonnées ou pas`});
    // }
    if (!req.body.type) {
        errors.push({ text: `veuillez choisr le type de votre test` });
    }
    if (!req.body.test) {
        errors.push({ text: `veuillez ajouter une question à un test valide` });
    }

    console.log(`hna console loging :`);
    console.log(`question: ${req.body.question}`);
    console.log(`hasOrder: ${req.body.hasOrder}`);
    console.log(`type: ${req.body.type}`);
    console.log(`test: ${req.body.test}`);
    // hna les verifications 3la les inputs

    if (errors.length > 0) {
        console.log(`tl3o des errors hna`)

        /*res.render('questions/index', {
          errors: errors,
          question: req.body.question,
          hasOrder: req.body.hasOrder,
          creator: req.user.id,
          // duree:dureeParsed,
          type:req.body.type,
          test:req.body.test
    
        });*/
    } else {
        const newQuestion = {
            question: req.body.question,
            hasOrder: Boolean(req.body.hasOrder),
            creator: req.user.id,
            type: req.body.type,
            test: req.body.test
        }

        new Question(newQuestion)
            .save()
            .then(question => {
                req.flash('success_msg', 'La question a été ajouté avec succées');
                res.redirect(`/tests/details/${newQuestion.test}/questions`);
            })
    }
}
);

// Delete questions
router.delete('/:id', ensureAuthenticated, (req, res) => {

    Question.remove({
        _id: req.params.id,
        creator: req.user.id
    }).then(() => {
        req.flash('success_msg', 'La question a été supprimée avec succès');
        res.redirect('back');
    })

        .catch(err => {
            console.log('2')
            console.log(err)
        });

});

// update form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Question.findOne({
        _id: req.params.id
    })
        .then(question => {
            if (question.creator != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/tests');
            } else {
                res.render('questions/edit', {
                    question: question
                });
            }
        });
});

// process update form
router.put('/', ensureAuthenticated, (req, res) => {
    console.log('dkhlna hnaaaaaaaaaa put man')
    Question.findOne({
        _id: req.body.id
    })
        .then(question => {
            if (question.creator != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/tests');
            } else {
                question.question = req.body.question;
                question.hasOrder = Boolean(req.body.hasOrder);
                question.type = req.body.type;
                question.save()
                    .then(test => {
                        req.flash('success_msg', 'La question à été mis à jour');
                        res.redirect('/tests/details/'+question.test+'/questions');
                    })
            }
        });
});

// hna ghandir index les reponses 

module.exports = router;
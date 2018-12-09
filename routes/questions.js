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
        errors.push({ text: `veuillez ajouter un question à votre question` });
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
            hasOrder: new Boolean(req.body.hasOrder),
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
// var testId;
    Question.findOne({ _id: req.params.id})
    .then(test => {
        var testId=test._id;
    


    Question.remove({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'La question a été supprimée avec succès');
            res.redirect('/tests/details/'+testId);
        });
    });
});



module.exports = router;
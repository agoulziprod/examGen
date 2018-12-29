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
const Reponse = mongoose.model('questionReponse');

function shuffle(array) {
    let currentIndex = array.length
     , temporaryValue
     , randomIndex
     ;
   while (0 !== currentIndex) {
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;
     //permuter lia les valeurs
 [array[randomIndex],array[currentIndex]]=[array[currentIndex],array[randomIndex]];
/*
     temporaryValue = array[currentIndex];
     array[currentIndex] = array[randomIndex];
     array[randomIndex] = temporaryValue;
     */
   }
   return array;
 }
// Reponse Index Page
router.get('/:id/reponses', ensureAuthenticated, (req, res) => {
    Reponse.find({ _id: req.params.id })
        .sort({ date: 'desc' })
        .then(reponses => {
            res.render('reponses/index', {
                reponses: reponses
            });
        });
});

// Question index page
router.get('/details/:id/questions', ensureAuthenticated, (req, res) => {

    Reponse.findOne({
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

// Reponse details page
router.get('/details/:id', ensureAuthenticated, (req, res) => {
    Reponse.findOne({
        _id: req.params.id
    })
        .then(reponse => {
            if (reponse.creator != req.user.id) {
                req.flash('error_msg', `vous n'etes pas autorisé !`);
                res.redirect('/reponses');
            } else {
                // console.log(reponse);
                Question.find({ reponse: req.params.id })
                    .sort({ date: 'desc' })
                    .then(questions => {
                        res.render('reponses/details', {
                            reponse: reponse,
                            question: questions
                        });
                    });

            }

        });
});

// Add Reponse Form
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('reponses/add');
});

// Edit Reponse Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Reponse.findOne({
        _id: req.params.id
    })
        .then(reponse => {
            if (reponse.creator != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/reponses');
            } else {
                res.render('reponses/edit', {
                    reponse: reponse
                });
            }
        });
});

// Process Add Form
router.post('/', ensureAuthenticated, (req, res) => {
    let errors = [];

    if (!req.body.nom) {
        errors.push({ text: `veuillez ajouter un nom à votre reponse` });
    }
    if (!req.body.dureeM && !req.body.dureeH) {
        errors.push({ text: `veuillez définir une durée valide pour votre reponse` });
    }
    if (!req.body.questions) {
        errors.push({ text: `veuillez ajouter un nombre de questions à votre reponse` });
    }
    if (!req.body.messageDebut) {
        errors.push({ text: `veuillez ajouter un message de début à votre reponse` });
    }
    if (!req.body.messageFin) {
        errors.push({ text: `veuillez ajouter un message de fin à votre reponse` });
    }

    // hna les verifications 3la les inputs

    if (errors.length > 0) {
        res.render('/add', {
            errors: errors,
            nom: req.body.nom,
            details: req.body.details,
            creator: req.user.id,
            // duree:dureeParsed,
            isActive: req.body.isActive,
            messageDebut: req.body.messageDebut,
            messageFin: req.body.messageFin,
            questions: req.body.questions,

        });
    } else {
        let dureeParsed = parseInt(req.body.dureeH) * 60 + parseInt(req.body.dureeM);

        const newTestShema = {
            nom: req.body.nom,
            duree: dureeParsed,
            questions: req.body.questions,
            isActive: req.body.isActive,
            messageDebut: req.body.messageDebut,
            messageFin: req.body.messageFin,
            creator: req.user.id
        }

        new Reponse(newTestShema)
            .save()
            .then(reponse => {
                req.flash('success_msg', 'Le reponse a été ajouté avec succées');
                res.redirect('/reponses');
            })
    }
});

// Edit Form process
router.put('/:id', ensureAuthenticated, (req, res) => {
    Reponse.findOne({
        _id: req.params.id
    })
        .then(reponse => {
            console.log(`req.body.isActive ha ach 3taat : ${req.body.isActive}`);

            let dureeParsed = parseInt(req.body.dureeH) * 60 + parseInt(req.body.dureeM);
            reponse.nom = req.body.nom;
            reponse.duree = dureeParsed;
            reponse.questions = req.body.questions;
            reponse.isActive = Boolean(req.body.isActive);
            reponse.messageDebut = req.body.messageDebut;
            reponse.messageFin = req.body.messageFin;
            console.log(reponse);
            reponse.save()
                .then(reponse => {
                    req.flash('success_msg', 'Le reponse à été mis à jour');
                    res.redirect('/reponses');
                })
        });
});

// Delete Reponse
router.delete('/:id', ensureAuthenticated, (req, res) => {
    Reponse.remove({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'La réponse a été supprimée avec succès');
            res.redirect('back');

        });
});

module.exports = router;
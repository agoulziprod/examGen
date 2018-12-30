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
require('../models/TestInstance');
const TestInstance = mongoose.model('testInstance');


// Test Index Page
router.get('/', ensureAuthenticated, (req, res) => {
  const userRole = req.user.role;
  //traitement 3la 7sab khona li mconnecter

  switch (userRole) {
    case 'enseignant':
      Test.find({ creator: req.user.id })
        .sort({ date: 'desc' })
        .then(tests => {
          res.render('tests/index', {
            tests: tests,
            role: req.user.role
          });
          //i wanna retreive the value of : how much every test have 

          // Question.find({ test: req.params.id })
          //   .sort({ date: 'desc' })
          //   .then(questions => {
          //     tests.forEach(function (test) {
          //       questions.forEach(function (question) {
          //         if (test._id == question.test)
          //           tests.questionsAdded++;
          //       })
          //     });
        });
      break;
    case 'apprenant':
      // code block
      res.redirect('/testInstances');
      break;
    default:
  }



});

// Question index page
router.get('/details/:id/questions', ensureAuthenticated, (req, res) => {

  Test.findOne({
    _id: req.params.id
  })
    .then(test => {
      if (test.creator != req.user.id) {
        req.flash('error_msg', `vous n'etes pas autorisé !`);
        res.redirect('/tests');
      } else {
        let newArray = new Array();
        Question.find({ test: req.params.id })
          .sort({ date: 'desc' })
          .then(questions => {
            QuestionReponse
              .find()
              .then(questionReponse => {
                let newQuestions = new Array();
                questions.forEach(element => {
                  // let newReponses = new Array();
                  let newElement = element;
                  let newReponses = questionReponse.filter(rep => rep.question == element._id);
                  let objetDialQS = { questionReponse: newReponses }
                  console.log("hna hna ghanchofo wach l'objet fih array dialna");
                  let objecto = Object.assign({}, newElement, objetDialQS);
                  console.log("hna lobjet 7arfi nchofo");
                  console.log(objecto);
                  console.log("sala lobjet l7arfi");

                  newArray.push(objecto);


                  // console.log(Object.assign(newElement, newReponsesObject));
                  // console.log(JSON.stringify(questions, null, 4));

                  console.log("3la molana");

                  // newElement["questionReponses"]=newReponses;
                  // console.log(newElement);
                  // console.log(Object.assign({}, element, newReponses));
                });

                // Object.assign({}, questions[1], element)

                console.log("hna nchofo couou");
                // console.log(JSON.stringify(questions, null, 4));

              });

            // console.log(JSON.stringify(questions, null, 4));
            res.render('questions/index', {
              question: newArray,
              test: test
            });
          });
      }
    });


});

// Test details page
router.get('/details/:id', ensureAuthenticated, (req, res) => {
  Test.findOne({
    _id: req.params.id
  })
    .then(test => {
      if (test.creator != req.user.id) {
        req.flash('error_msg', `vous n'etes pas autorisé !`);
        res.redirect('/tests');
      } else {
        // console.log(test);
        Question.find({ test: req.params.id })
          .sort({ date: 'desc' })
          .then(questions => {
            res.render('tests/details', {
              test: test,
              question: questions
            });
          });

      }

    });
});

// Add Test Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('tests/add');
});

// Edit Test Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Test.findOne({
    _id: req.params.id
  })
    .then(test => {
      if (test.creator != req.user.id) {
        req.flash('error_msg', 'Not Authorized');
        res.redirect('/tests');
      } else {
        res.render('tests/edit', {
          test: test
        });
      }
    });
});

// Process Add Form
router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];

  if (!req.body.nom) {
    errors.push({ text: `veuillez ajouter un nom à votre test` });
  }
  if (!req.body.dureeM && !req.body.dureeH) {
    errors.push({ text: `veuillez définir une durée valide pour votre test` });
  }
  if (!req.body.questions) {
    errors.push({ text: `veuillez ajouter un nombre de questions à votre test` });
  }
  if (!req.body.messageDebut) {
    errors.push({ text: `veuillez ajouter un message de début à votre test` });
  }
  if (!req.body.messageFin) {
    errors.push({ text: `veuillez ajouter un message de fin à votre test` });
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

    new Test(newTestShema)
      .save()
      .then(test => {
        req.flash('success_msg', 'Le test a été ajouté avec succées');
        res.redirect('/tests');
      })
  }
});

// Edit Form process
router.put('/:id', ensureAuthenticated, (req, res) => {
  Test.findOne({
    _id: req.params.id
  })
    .then(test => {
      // new values

      // test.title = req.body.title;
      // test.details = req.body.details;
      console.log(`req.body.isActive ha ach 3taat : ${req.body.isActive}`);
      // console.log(`req.body.isActive ha ach 3taat : ${{req.body.isActive}}`);

      let dureeParsed = parseInt(req.body.dureeH) * 60 + parseInt(req.body.dureeM);
      test.nom = req.body.nom;
      test.duree = dureeParsed;
      test.questions = req.body.questions;
      test.isActive = Boolean(req.body.isActive);
      test.messageDebut = req.body.messageDebut;
      test.messageFin = req.body.messageFin;
      console.log(test);
      test.save()
        .then(test => {
          req.flash('success_msg', 'Le test à été mis à jour');
          res.redirect('/tests');
        })
    });
});

// Delete Test
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Test.remove({ _id: req.params.id })
    .then(() => {
      req.flash('success_msg', 'Le test a été supprimé avec succès');
      res.redirect('/tests');
    });
});







module.exports = router;


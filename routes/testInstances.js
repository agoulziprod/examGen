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
  TestInstance.find({
    apprenant: req.user.id
  })
    .sort({ date: 'desc' })
    .then(instances => {

      res.render('testInstance/index', {
        instances: instances
      });

    })


});
/*

*/
// Test Index Page
router.post('/', ensureAuthenticated, (req, res) => {

  let testInstanceObject = {}, questionsObject = {}, questionReponseObject = {};

  // retreiving test
  Test.findOne({
    isActive: true,
    _id: req.body.test
  })
    .then(test => {

      testInstanceObject = Object.assign({}, {
        test: test._doc._id,
        apprenant: req.user.id,
        duree: test._doc.duree,
        length: test._doc.questions,
        score:0
      });

      Question.find({
        test: test._id
      }).sort({ date: 'desc' })
        .then(questions => {

          QuestionReponse.find({
            // hadi mnni nzidha f shema ndirha bach mayjibch ga3 les questionReponses
            // test: test._id
          })
            .sort({ date: 'desc' })
            .then(questionReponses => {
              let cleanedQuestions = [];
              questions.forEach(el => {
                delete el._doc.hasOrder;
                delete el._doc.creator;
                delete el._doc.test;
                delete el._doc.date;
                delete el._doc.__v;
                let questionReponse = questionReponses.filter(p => p.question == el._doc._id);
                questionReponse.forEach(repEl => {
                  delete repEl._doc.question;
                  delete repEl._doc.creator;
                  delete repEl._doc.__v;
                  delete repEl._doc.date;
                })
                let a = Object.assign({}, el._doc, {
                  questionReponses: questionReponse
                });
                cleanedQuestions.push(a)
              })

              testInstanceObject = Object.assign(testInstanceObject, {
                questions: cleanedQuestions
              });
              new TestInstance(testInstanceObject)
                .save()
                .then(instance => {
                  req.flash('success_msg', `votre instance d'examen a été créé avec succées`);
                  // had la page hia fiha message de debut o ghatsiftni l first question
                  res.redirect('/testInstances/pret/'+instance._id);
                })
            })
        })

      // res.redirect('/testInstances2/cc');

    })
    .catch(err => {
      req.flash('error_msg', `veuillez s'assurer du code, aucun test ne porte cet id!
      ${err}
      `);
      res.redirect('/testInstances');
    });
  // console.log("nchofo wach scope m3ana olla kitfalla 3lina")
  // console.log(testInstanceObject)
  // console.log(JSON.stringify(testInstanceObject, null, 4));

  // retreiving all questions existing in the database
  /*
  Question.find({
    //test: testObject._id
  })
    .sort({ date: 'desc' })
    .then(test => {
      testObject=test;
      console.log("lginah ok");
      
    })
    */


  // res.render('testInstance/pret');

});


// pret page :
router.get('/pret/:instanceid', ensureAuthenticated, (req, res) => {
  console.log('\x1b[36m%s\x1b[0m','printi req lli f param')
        console.log(req.params.instanceid)

  TestInstance.findOne({
    _id: req.params.instanceid,
    apprenant: req.user.id
  })
    .then(instance => {

      console.log('\x1b[31m%s\x1b[0m', 'printi f lia l instance'); 
        
        console.log(instance)
      // njib daba test schema
      Test.findOne({
        _id: instance.test
      }).then(test => {

        console.log('\x1b[31m%s\x1b[0m','printi f lia test')
        console.log(test)


        res.render('testInstance/pret', {
          instance: instance,
          test: test
        });
      })
        .catch(err => {
          req.flash('error_msg', `un erreur est produit, veuillez entrer le code à nouveau
        ${err}
        `);
          res.redirect('/testInstances');
        })
    })
    .catch(err => {
      req.flash('error_msg', `un erreur est produit, veuillez entrer le code à nouveau
      ${err}
      `);
      res.redirect('/testInstances');
    })


});

module.exports = router;
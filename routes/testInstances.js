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
  res.render('testInstance/index');

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
  }).sort({ date: 'desc' })
    .then(test => {

      testInstanceObject = Object.assign({}, {
        test: test._doc._id,
        apprenant: req.user.id,
        duree: test._doc.duree,
        length: test._doc.questions
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
                  req.flash('success_msg', `L'instance tsaybaaate 3la slamtk a été ajouté avec succées`);
                  res.redirect('/');
                })

            })






        })

      // res.redirect('/testInstances2/cc');

    })
    .catch(err => {
      req.flash('error_msg', `veuillez s'assurer du code, aucun test ne porte cet id!
      ${err}
      `);
      res.redirect('/testInstances2');
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

module.exports = router;
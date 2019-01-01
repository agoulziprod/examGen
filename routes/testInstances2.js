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
  var testObject,questionsObject,questionReponseObject;

  // retreiving test
  Test.findOne({
    isActive: true,
    _id: req.body.test
  })
    .sort({ date: 'desc' })
    .then(test => {
      //testObject=test;
      Object.assign(testObject,test);
      console.log("lginah ok");
      console.log(testObject);
      
    })
    .catch(err => {
      req.flash('error_msg', `veuillez s'assurer du code, aucun test ne porte cet id!`);
      res.redirect('/testInstances');
    });
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

    console.log("ghandozo hna ?");
    console.log(testObject);


  // res.render('testInstance/pret');

});

module.exports = router;
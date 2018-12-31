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

  Test.findOne({
    isActive: true,
    _id: req.body.test
  })
    .then(test => {
      if (test == null) {
        req.flash('error_msg', `veuillez s'assurer du code, aucun test ne porte cet id!`);
        res.redirect('/testInstances');
      }else{
        // ici la generation du testInstance :D
        res.render('testInstance/pret', {
        test: test
        // ,role: req.user.role
      });
      }
      

    })
    .catch(err => {
      req.flash('error_msg', `veuillez s'assurer du code, aucun test ne porte cet id!`);
      res.redirect('/testInstances');


    });
  // res.render('testInstance/index');

});

module.exports = router;
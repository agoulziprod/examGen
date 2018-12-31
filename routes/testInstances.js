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
TestInstance.find({ passedBy: req.user.id })
      .sort({ date: 'desc' })
      .then(tests => {
        res.render('tests/student/index', {
          tests: tests
          // ,role: req.user.role
        });
       
      });
*/


module.exports = router;
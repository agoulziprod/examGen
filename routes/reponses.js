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



// Test Index Page consulter les reponses d'un testinstance
router.get('/:id', ensureAuthenticated, (req, res) => {
  Reponses.findOne({
    apprenant: req.user.id,
    testInstance: req.param.id
  })
    .then(reponses => {

      res.render('testInstance/index', {
        reponses: reponses
      });

    })
    .catch(err=>{

    })


});
/*

*/
// ajouter les reponses
router.post('/', ensureAuthenticated, (req, res) => {
console.log("req.body");
console.log(req.body);
res.send('skkkkr');
});



module.exports = router;
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

require('../models/Reponses');
const Reponses = mongoose.model('reponses');



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
    .catch(err => {

    })


});
/*

*/
// ajouter les reponses
router.post('/', ensureAuthenticated, (req, res) => {
  //redirect if the user isn't a student
  if (req.user.role.localeCompare("apprenant") != 0) {
    req.flash('error_msg', 'Not Authorized');
    res.redirect('/');
  }
  //create reponse  and reponsesObj objects :done
  let reponses, reponsesObj = {};

  //now inserting data into our object and cleaning it after that
  reponses = Object.assign({},req.body);

  delete reponses.test;
  delete reponses.testInstance;
  // i got to convert the object reponses into an array
  // var varo = Object.entries(reponses);
  let reponsesArray,newArray=[];
  reponsesArray=Object.keys(reponses);
  reponsesArray.forEach(key=>{
    let temp={};
    temp[key]=reponses[key];
    newArray.push(temp);

  })

  
  //then append it into reponsesObj
  //store it and redirect user
  reponsesObj = Object.assign(reponsesObj, {
    test:req.body.test,
    testInstance: req.body.testInstance,
    apprenant: req.user.id,
    sentTime:Date.now(),
    reponses:newArray
  })
  new Reponses(reponsesObj)
  .save()
  .then(rep => {
    // hna khass n7asbo score o nsiftoh lih
    
    req.flash('success_msg', 'Le test a été ajouté avec succées');
    res.redirect('/testInstances');
  })
  
  
  
  // res.send(reponsesObj);
});



module.exports = router;
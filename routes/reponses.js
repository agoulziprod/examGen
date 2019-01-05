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
  reponses = Object.assign({}, req.body);

  delete reponses.test;
  delete reponses.testInstance;
  // i got to convert the object reponses into an array
  // var varo = Object.entries(reponses);
  let reponsesArray, newArray = [];
  reponsesArray = Object.keys(reponses);
  reponsesArray.forEach(key => {
    let temp = {};
    temp[key] = reponses[key];
    newArray.push(temp);

  })
console.log('hna nchofo array jdid kidayr wach question: rep olla chi haja khra')
console.log(newArray)

  //then append it into reponsesObj
  //store it and redirect user
  reponsesObj = Object.assign(reponsesObj, {
    test: req.body.test,
    testInstance: req.body.testInstance,
    apprenant: req.user.id,
    sentTime: Date.now(),
    reponses: newArray
  })
  new Reponses(reponsesObj)
    .save()
    .then(rep => {
      // hna khass n7asbo score o nsiftoh lih
      QuestionReponse.find({})
        .then(lesReponses => {

          lesReponses.forEach(el => {
            delete el._doc.reponse;
            // delete el._doc.question;
            delete el._doc.__v;
            delete el._doc.creator;
            delete el._doc.date;
          });
          // daba 3andna gha les rep qui sont true
          const trueQuestions = lesReponses
            .filter(question => question.isTrue == true)
            .map(question => question._id);

            console.log('hna les type')
  const stringTrueQ=trueQuestions.map(e=>e=String(e))
  console.log('wach t applika skfkef')

  stringTrueQ.forEach(e=>  console.log(typeof e))

//daba comparaison mabine array dialna o array lli jbna mn base de donnée
let onlyRep=newArray.map(el=>{
  return Object.values(el).toString()})
// now i got to compaire every item from this skafandria table to the trueQuestions table
let score=0;
onlyRep.forEach(el=>{
console.log("index of"+el+'est')
console.log(stringTrueQ.indexOf(el)>0? 1 : 0)
  score+=stringTrueQ.indexOf(el)>0? 1 : 0;
  console.log("score")
  console.log(score)

})
// console.log("newArray")
// console.log(newArray)
// console.log("skafandria")
// console.log(skafandria)
// console.log(JSON.stringify(skafandria, null, 4));
// console.log("trueQuestions")
// console.log(trueQuestions)
          req.flash('success_msg', 'Vos réponses ont été enregistré avec succès, vuos avez eu un score de : ');
          res.redirect('/testInstances');
        })


    })



  // res.send(reponsesObj);
});



module.exports = router;
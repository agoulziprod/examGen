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
    .sort({ date: 'desc' })
    .then(test => {
      if (test == null) {
        req.flash('error_msg', `veuillez s'assurer du code, Le test que vous avez selectionnez est désactivé!`);
        res.redirect('/testInstances');
      } else {
        var newQuestions = new Array();
        var questionReponsesFiltered;
        var objectReponses;
        var objecto;
        // ici la generation du testInstance :D
        let testInstance = new TestInstance();
        testInstance.test = test._id;
        testInstance.apprenant = req.user.id;
        testInstance.lengh = test.duree;



        Question.find({
          test: test.id
        })
          .sort({ date: 'desc' })
          .then(questions => {
            // console.log('hna hna qbal recherche dial questionReponses')
            QuestionReponse.find().then(questionReponses => {

              // console.log('wa lqinahom o dkhalna')
              questions.forEach(question => {
                // console.log('iwa daba kanbookliw o kanchofo chaque question achno fih')
                // console.log(question)
                // let newElement = question;
                questionReponsesFiltered = questionReponses.filter(rep => rep.question == question._id);
                // daba khass ndiro questionReponsesFiltered dans questionReponses dial question;
                // question['questions']=questionReponsesFiltered;
                // console.log('iwa daba nchooof ahadchi kaaml ach fih wach sdqat olla la');
                // console.log(question)
                // console.log("olah ma3rft ach kana ffichéé hna");
                objectReponses = { reponses: questionReponsesFiltered }
                // console.log(objectQuestions)
                objecto = Object.assign({}, question, objectReponses);
                // console.log('daba nchofo objectoo dialna achno fiiih')
                // console.log(objecto)
                newQuestions.push(objecto);
              });

              console.log('salina hna boocle aji nchofo lobjet kaml ach fih 999999')
              console.log(JSON.stringify(newQuestions, null, 4));
              // hna ghan afficher hadak khona nchofo kidayr f structure dialo
              // var lastObject={'questions':new Questions};
              // testInstance['questions']=newQuestions;
              // var newtestInstance = Object.assign( testInstance, lastObject);
              var newtestInstance={} ;

              // Object.defineProperty(testInstance,'questions',{newQuestions} );
              objectQuestion = { questions: newQuestions }
              let objecto2 = Object.assign({}, testInstance, objectQuestion);
              testInstance=objecto2;
              // // console.log(testInstance)
              // console.log('stringify lia lobjet2222 nchoof');

              // console.log(JSON.stringify(testInstance, null, 4));
              // safi salina daba dabbarna 3la l'objet dialna finally ! ouf ba3da toli 3anae
              testInstance
              .save()
              .then(testInstance => {
                req.flash('success_msg', 'Le test exist, vous pouvez commencez dés maintenent');
                res.redirect('/testInstance/'+testInstance._id);
              })


            });


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
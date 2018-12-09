const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

// Load Test  and Question Model
require('../models/Test');
const Test = mongoose.model('tests');
require('../models/Question');
const Question = mongoose.model('question');





// Process Add Form

router.post('/', ensureAuthenticated, (req, res) => {
    // console.log('tfa7aa');
    // res.send('ok rak nadi');

    let errors = [];
  
    if(!req.body.question){
      errors.push({text:`veuillez ajouter un question à votre question`});
    }
    if(!req.body.questions){
      errors.push({text:`veuillez ajouter un nombre de questions à votre test`});
    }
    if(!req.body.messageDebut){
      errors.push({text:`veuillez ajouter un message de début à votre test`});
    }
    if(!req.body.messageFin){
      errors.push({text:`veuillez ajouter un message de fin à votre test`});
    }
   
    // hna les verifications 3la les inputs
  
    if(errors.length > 0){
      res.render('/add', {
        errors: errors,
        nom: req.body.nom,
        details: req.body.details,
        creator: req.user.id,
        // duree:dureeParsed,
        isActive:req.body.isActive,
        messageDebut:req.body.messageDebut,
        messageFin:req.body.messageFin,
        questions:req.body.questions,
  
      });
    } else {
      let dureeParsed= parseInt(req.body.dureeH)*60 +parseInt(req.body.dureeM);
  
      const newTestShema = {
        nom: req.body.nom,
        duree:dureeParsed,
        questions:req.body.questions,
        isActive:req.body.isActive,
        messageDebut:req.body.messageDebut,
        messageFin:req.body.messageFin,
        creator: req.user.id
      }
    
      new Test(newTestShema)
        .save()
        .then(test => {
          req.flash('success_msg', 'Le test a été ajouté avec succées');
          res.redirect('/tests');
        })
    }
  }
  );
  
  
module.exports = router;
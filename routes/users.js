const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

// Load User Model
require('../models/User');
const User = mongoose.model('users');

// User Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

// User Register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});

// Login Form POST
router.post('/login', (req, res, next) => {
  let enseignant={
    successRedirect: '/tests',
    failureRedirect: '/users/login',
    failureFlash: true
  }, apprenant={
    successRedirect: '/test/avm',
    failureRedirect: '/users/login',
    failureFlash: true
  };
  passport.authenticate('local', {
    successRedirect: '/tests',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Register Form POST
router.post('/register', (req, res) => {
  let errors = [];

  if (req.body.password != req.body.password2) {
    errors.push({ text: 'Les deux champs mots de passe ne sont pas identique' });
  }

  if (req.body.password.length < 4) {
    errors.push({ text: 'Le mot de passe doit contenir au moins 4 charactères' });
  }

  if (errors.length > 0) {
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          req.flash('error_msg', `L'email existe déja`);
          res.redirect('/users/register');
        } else {
          console.log("hna nchofo role ");
          console.log(req.body.role);
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'Vous pouvez maintenant se connecter');
                  res.redirect('/users/login');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      });
  }
});

// Logout User
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Vous êtes déconnecté');
  res.redirect('/users/login');
});

module.exports = router;
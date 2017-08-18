const knex = require('./connection')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

function validNewUser(user) {
  let validName = typeof user.name === 'string' && user.name.trim() !== '';
  let validEmail = typeof user.email === 'string' && user.email.match(/([@])/g) != null;
  let validPassword = typeof user.password === 'string' && user.email.trim() !== '' && user.password.length > 4;
  return validName && validEmail && validPassword;
}

router.post('/signup', (req, res) => {
  if (validNewUser(req.body)) {
    knex('user')
      .where('email', req.body.email)
      .then(user => {
        if (user.length === 0) {
          const saltRounds = 8;
          const hash = bcrypt.hashSync(req.body.password, saltRounds);
          req.body.password = hash;
          knex('user')
            .insert(req.body).returning('*')
            .then(user => {
              delete user[0].password;
              res.json(user);
            })
        } else {
          res.json({
            error: 'there is an account for this email address'
          })
        }
      })
  } else {
    res.json({
      error: 'invalid inputs'
    })
  }
})

router.post('/login', (req, res) => {
  knex('user')
    .where('email', req.body.email)
    .then(user => {
      if (user.length === 0) {
        res.json({
          error: 'email not found'
        });
      } else {
        let match = bcrypt.compareSync(req.body.password, user[0].password);
        if (match) {
          delete user[0].password;
          res.json(user);
        }
      }
    })
})

module.exports = router;;

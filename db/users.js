const knex = require('./connection')
const express = require('express');
const router = express.Router();

function validUser(user) {
  let validName = typeof user.name === 'string' && user.name.trim() !== '';
  let validEmail = typeof user.email === 'string' && user.email.match(/([@])/g) != null;
  let validPassword = typeof user.password === 'string' && user.email.trim() !== '' && user.password.length > 4;
  return validName && validEmail && validPassword;
}

router.post('/signup', (req, res) => {
  console.log(req.body.password.length);
  if (validUser(req.body)) {
    knex('user')
      .where('email', req.body.email)
      .then(user => {
        if (user.length === 0) {
          knex('user')
            .insert(req.body).returning('*')
            .then(user => {
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


module.exports = router;

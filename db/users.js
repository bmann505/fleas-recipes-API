const knex = require('./connection')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


function validNewUser(user) {
  let validName = typeof user.name === 'string' && user.name.trim() !== '';
  let validEmail = typeof user.email === 'string' && user.email.match(/([@])/g) != null;
  let validPassword = typeof user.password === 'string' && user.email.trim() !== '' && user.password.length >= 4;
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
              let token = jwt.sign(user[0], process.env.TOKEN_SECRET)
              res.json({
                data: token
              });
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
  console.log(req.body);
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
          let token = jwt.sign(user[0], process.env.TOKEN_SECRET)
          res.json({
            data: token
          });
        }
      }
    })
})

router.get('/users/:id', (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.substring(7);
    // console.log('req', req.headers.authorization);
    // console.log('token', token);
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded.id == req.params.id) {
      knex('recipe')
        .select('recipe.title', 'recipe.description', 'recipe.type', 'recipe.ingredients', 'recipe.prep_time', 'recipe.cook_time', 'recipe.rating')
        .innerJoin('user_recipe', 'recipe.id', 'user_recipe.recipe_id')
        .innerJoin('user', 'user.id', 'user_recipe.user_id')
        .where('user.id', req.params.id)
        .then(user => {
          res.json(user);
        })
    } else {
      res.status(401);
      res.json({
        error: 'Unauthorized'
      });
    }
  } else {
    res.json({
      error: 'Unauthorized'
    })
  }
})

module.exports = router;

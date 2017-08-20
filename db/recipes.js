const knex = require('./connection')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.get('/', (req, res) => {
  knex('recipe')
    .then(recipes => {
      res.json(recipes);
    })
})






module.exports = router;

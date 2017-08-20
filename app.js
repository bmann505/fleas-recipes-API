const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const users = require('./db/users.js');
const recipes = require('./db/recipes');


app.use(cors());

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use('/', users)
app.use('/users', users)
app.use('/recipes', recipes)

app.listen(port);

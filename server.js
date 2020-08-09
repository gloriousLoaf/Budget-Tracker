const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');

const PORT = 3000;

const app = express();

app.use(logger('dev'));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Dev environment
// mongoose.connect('mongodb://localhost/budget', {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

mongoose.connect('mongodb://user:password123@ds157895.mlab.com:57895/heroku_3z5g0tbt', {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require('./routes/api.js'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
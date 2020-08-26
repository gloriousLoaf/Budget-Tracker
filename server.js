// dependecies
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');

// Express
const app = express();
app.use(logger('dev'));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Dev environment connection
// mongoose.connect('mongodb://localhost/budget', {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

// Old mLab connection
// mongoose.connect('mongodb://user:password123@ds157895.mlab.com:57895/heroku_3z5g0tbt', {
//   useNewUrlParser: true,
//   useFindAndModify: false
// })

// MongoDB connection
mongoose.connect('mongodb+srv://user:password123@cluster-3z5g0tbt.8kpt2.mongodb.net/heroku_3z5g0tbt?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require('./routes/api.js'));

// listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
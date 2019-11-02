var request = require('request');
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var env = require('dotenv');
env.config();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.post('/get-projects', function(req, res, next) {

  const opts = {
    url: req.body.url,
    headers: {
      Authorization: `Bearer ${process.env.HARVEST_TOKEN}`,
      'Harvest-Account-Id': process.env.HARVEST_ACCOUNT_ID,
      'User-Agent': 'Clubhouse Timer'
    }
  };

  request.get(opts, function(err, resp, body) {
    if (err) return console.log(err);
    res.json(JSON.parse(body));
  })
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

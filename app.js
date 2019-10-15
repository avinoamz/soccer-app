var createError = require('http-errors');
var express = require('express');
var app = express();
var logger = require('morgan');
var fs = require('fs');
var csv = require('csv-parser');
var db = require('./database');
var router = require('./routes')(app);
app.use(logger('dev'));
app.use(express.json());

fs.createReadStream('result_played.csv')
  .pipe(csv())
  .on('data', (row) => {
    db.addGameInfo(row, 'played');
  })
  .on('end', () => {
    console.log('CSV file successfully processed result_played');
  });

fs.createReadStream('result_upcoming.csv')
  .pipe(csv())
  .on('data', (row) => {
    db.addGameInfo(row, 'upcoming');
  })
  .on('end', () => {
    console.log('CSV file successfully processed result_upcoming');
  });


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;

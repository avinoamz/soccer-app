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

readFile('result_played.csv', 'played');
readFile('result_upcoming.csv', 'upcoming');

function readFile(fileName, status){
  fs.createReadStream(fileName)
  .pipe(csv())
  .on('data', (row) => {
    db.addGameInfo(row, status);
  })
  .on('end', () => {
    console.log(`CSV file successfully processed ${fileName}`);
  });
}

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

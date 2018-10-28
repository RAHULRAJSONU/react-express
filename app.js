global.__base = __dirname + '/';
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require(__base + 'config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.all('*', function (req, res, next) {
  console.log('Intercepted______', req.headers)
  console.log('Accessing the secret section ...')
  console.log('apiKey: ', req.get('apiKey'));
  if(process.env.NODE_ENV === 'production' && req.get('apiKey') === config.apiKey) {
    console.log('apiKey: ', req.get('apiKey'));
    return next();
  }
  if(process.env.NODE_ENV !== 'production'){
    return next();
  }
  res.send({message: 'Resource not found!'});
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  console.log('Environment___', process.env.NODE_ENV)
  if(process.env.NODE_ENV === 'production'){
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  }else{
    res.send({message: 'Resource not found!'});
  }  
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
  res.render('error');
});

module.exports = app;

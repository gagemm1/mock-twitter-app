
var express = require('express'); //these are your different modules. 
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport'); //this is the passport dependency you installed. 
var session = require('express-session')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var api = require('./routes/api');
var authenticate = require('./routes/authenticate')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(session({
  secret:'super-duper-secret'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize()); //you need to initialize passport before starting the session in the line below
app.use(passport.session()); //the order you have these in is the order that it goes on the stack because it's javascript. 

//Initialize passport, requires the file we made (passport-init)
var initPassport = require('./passport-init');
initPassport(passport);

app.use('/api', api);
app.use('/auth', authenticate);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

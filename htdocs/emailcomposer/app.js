// Lancement de la gestion BDD au start du serveur NODE
require('../emailcomposer/node_modules/mongo-express/app.js');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var auth = require('basic-auth');
var routes = require('./routes/index');
var users = require('./routes/users');
var services = require('./routes/services');

var sassMiddleware = require('node-sass-middleware');

// Connexion BDD
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/emailcomposer', function(err) {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

// Declaration de l'APP express
var app = express();
// Utilisation de SASS pour compiler les CSS
app.use(sassMiddleware({
  /* Options */
  src: __dirname + '/public',
  dest: __dirname + '/public',
  debug: true,
  outputStyle: 'compressed',
  //    prefix:  '/prefix'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
// Septup de Système de View sous HandleBars
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('html', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'html');
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'app')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/services', services);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// app.set('env', 'production');
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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session= require('express-session');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var staffRouter = require('./routes/staff'); //busca staff.js
var bodasRouter = require('./routes/bodas');
var sesionRouter = require('./routes/sesion');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'paxmaerzitreoqwn857v',
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/staff', staffRouter);  //controlador o manejador de ruta
app.use('/bodas', bodasRouter);

app.get('/staff', function (req,res){
  res.render('staff')
})

app.get('/bodas', function (req,res){
  res.render('bodas')
})

app.get('/sesion', function(req, res) {
  var conocido= Boolean(req.session.nombre);

  res.render('sesion', {
    titulo: 'Inicio de sesión',
    conocido: conocido,
    nombre: req.session.nombre
  });
});

app.post('/ingresar', function(req, res){
  if (req.body.nombre) {
    req.session.nombre= req.body.nombre
  };
  res.redirect('/sesion');
});

app.get('/salir', function(req, res){
  req.session.destroy();
  res.redirect('/sesion');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

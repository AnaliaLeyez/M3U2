var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session= require('express-session');

require('dotenv').config();
var fileUpload= require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var staffRouter = require('./routes/staff'); //busca staff.js
var bodasRouter = require('./routes/bodas');
var quinceRouter = require('./routes/quince');
var modelajeRouter = require('./routes/modelaje');
var paisajesRouter = require('./routes/paisajes');
var trabajaConNosotrosRouter = require('./routes/trabajaConNosotros');
var loginRouter = require('./routes/admin/login');
var adminRouter= require('./routes/admin/novedades');

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

secured =async(req,res,next)=> {
  try{
    // console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next();
    } else{
      res.redirect('admin/login');
    }
  } catch(error){
    console.log(error);
  }
}

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir:'/tmp/'
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/staff', staffRouter);  //controlador o manejador de ruta
app.use('/bodas', bodasRouter);
app.use('/quince', quinceRouter);
app.use('/modelaje', modelajeRouter);
app.use('/paisajes', paisajesRouter);
app.use('/trabajaConNosotros', trabajaConNosotrosRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminRouter);

app.get('/staff', function (req,res){
  res.render('staff')
})

app.get('/bodas', function (req,res){
  res.render('bodas')
})

app.get('/quince', function (req,res){
  res.render('quince')
})

app.get('/modelaje', function (req,res){
  res.render('modelaje')
})

app.get('/paisajes', function (req,res){
  res.render('paisajes')
})

app.get('/trabajaConNosotros', function (req,res){
  res.render('trabajaConNosotros')
})

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

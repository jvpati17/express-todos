var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var todosRouter = require('./routes/todos');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//mount middleware into  middleware/request pipeline
//app.use([starts with path],<middleeware function>, [])

app.use(function(req, res, next) {
  console.log('hi');
  //add time property to res.locals objects
  //time property becomes accessible within templates
  res.locals.time = new Date().toLocaleTimeString()
  next();

});

//log in the terminal HTTP request info
app.use(logger('dev'));
//processes data sent in body of request, if json
app.use(express.json());
//processes data sent in 'form' body of request
//it will create property on req.body for each <input>, <select>, <textarea>
app.use(express.urlencoded({ extended: false }));
//add cookies property for each cookie sent in request
app.use(cookieParser());
//if request is for static asset, returns file
app.use(express.static(path.join(__dirname, 'public')));

//first arg is 'starts with' path
//paths within route modules are appended
//to the start with paths
app.use('/', indexRouter);
app.use('/todos', todosRouter);

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

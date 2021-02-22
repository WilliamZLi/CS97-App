var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var cors = require('cors');
var path = require('path');
var logger = require('morgan');


const MongoStore = require('connect-mongo')(session);
require('dotenv').config();

const ur = "mongodb+srv://test:passw0rd@cs97-cluster.gukdx.mongodb.net/app?retryWrites=true&w=majority";
var db = require('./db');
db.connect(ur, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
      console.log('Listening on port 5000...')
    }
})

var passport = require("./passport/setup");
var authRouter = require("./routes/auth");
var indexRouter = require('./routes/index');
var objCreateRouter = require('./routes/objcreate');
var objListRouter = require('./routes/objlist');
var logRouter = require('./routes/log');
var searchRouter = require('./routes/search');



var app = express();

const { NotExtended } = require('http-errors');
const bodyParser = require('body-parser');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(cors({credentials: true, origin: 'http://localhost:3000'})); //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secrets',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url:ur
  }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
// Routes
app.use("/auth", authRouter);
app.use('/', indexRouter);
app.use('/objs', objCreateRouter);
app.use('/objs', objListRouter);
app.use('/log', logRouter);
app.use('/search', searchRouter);



//TO DELETE SESSION//
//   req.session.destroy()

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
}); 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// error handler

module.exports = app;

var express = require("express");
var bodyParser = require('body-parser');
var path = require ('path');
var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var app = express();

//parse incomming request
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//server static files
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/views'));

//mongodb server connections this is a old project now
mongoose.connect("mongodb://localhost:27017/userData",  { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

//mongo error
//db.on('error', console.error.bind(console, ' connection error to database'));

//include routes which are kept diffrnt
var routes = require('./routes/index');
app.use('/', routes);

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//error handling
app.use(function(req, res, next){
  var err = new Error('FILE NOT FOUND');
  err.status= 404;
  next(err);
});


app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('error',{
    message: err.message,
    error:{}
});
  });

app.listen(3000,function(req,res){
    console.log("server running on port 3000");
  });

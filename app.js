var http = require('http');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.set("views" , path.resolve(__dirname , 'views'));
app.set("view engine" , "ejs");

var entries = [];
app.locals.entries = entries;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended : false}));

app.get("/" , function(request , response){
  response.render("index");
});

app.get("/new-entry", function(request , response){
  response.render("new-entry");
});

app.post("/new-entry" , function(request , response){
  if(!request.body.title || !request.body.body)
    response.status(400).send("Must have a title and body");
  else {
    entries.push({
      title: request.body.title,
      body: request.body.body,
      published: new Date()
    });
    response.redirect("/");
  }
});

app.use(function(request , response){
  response.status(404).render("404");
});

http.createServer(app).listen(3000 , function(){
  console.log("Started the express server");
});

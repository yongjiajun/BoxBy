console.log("server started");

var express = require('express');
var app = express();
var serv = require('http').Server(app);

//route for dashboard
app.get('/',function(req, res) {
    console.log("loading dashboard...");
    res.sendFile(__dirname + '/client/index.html');
});
//route for wikipedia
app.get('/wiki',function(req, res) {
    console.log("loading wikipedia...");
    res.sendFile(__dirname + '/client/wiki.html');
});
//route for khan academy
app.get('/khan_academy',function(req, res) {
    console.log("loading khan academy...");
    res.sendFile(__dirname + '/client/khan_academy.html');
});
//route for npm repo
app.get('/npm_repo',function(req, res) {
    console.log("loading npm repo...");
    res.sendFile(__dirname + '/client/npm_repo.html');
});
//route for vr app
app.get('/vr',function(req, res) {
    console.log("loading VR resources...");
    res.sendFile(__dirname + '/client/vr_app.html');
});
app.use('/client',express.static(__dirname + '/client'));//listens for when the client wants files.
app.use('/assets',express.static(__dirname + '/client/assets'));//listens for when the client wants files.

app.use('/scripts',express.static(__dirname + '/scripts'));//listens for files inside scripts

serv.listen(8000, '0.0.0.0');
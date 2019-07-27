console.log("server started");

var express = require('express');
var app = express();
var serv = require('http').Server(app);
app.get('/',function(req, res) {//listens for when the client opens the site.
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));//listens for when the client wants files.
serv.listen(2000);
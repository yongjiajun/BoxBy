console.log("server started");

var express = require('express');
var app = express();
var serv = require('http').Server(app);
var connectivity = require('connectivity');
var connectivity_status = "Not Available";
var availDisk, freeDisk, totalDiskm, cpu, ping;
var cpuStat = require('cpu-stat');


const disk = require('diskusage');
const os = require('os');

let path = os.platform() === 'win32' ? 'c:' : '/';

// set the view engine to ejs
app.set('view engine', 'ejs');
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

//route for vr app
app.get('/ar',function(req, res) {
    console.log("loading AR resources...");
    res.sendFile(__dirname + '/client/ar_app.html');
});

app.get('/dashboard', function(req,res) {

    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
    
        //the percentage cpu usage over all cores
        cpu = percent;
    
        //the approximate number of seconds the sample was taken over
        ping = seconds;
    });
    // get connectivity status
    connectivity(function (online) {
        if (online) {
            connectivity_status = "Available"
        }
      });

    // get disk usage
    disk.check(path, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            availDisk = Math.round(info.available/1000000000 * 100) / 100;
            freeDisk = Math.round(info.free/1000000000 * 100) / 100;
            totalDisk = Math.round(info.total/1000000000 * 100) / 100;
        }
    });

    res.render(__dirname + '/views/index.ejs', {
        connectivity_status: connectivity_status,
        availDisk: availDisk,
        disk: [freeDisk, totalDisk],
        cpu: Math.round(cpu * 100) / 100,
        deviceId: Math.random().toString(36).substr(2, 10),
        ping: Math.round(ping * 10) / 10,

    });
});

app.use('/client',express.static(__dirname + '/client'));//listens for when the client wants files.
app.use('/assets',express.static(__dirname + '/client/assets'));//listens for when the client wants files.
app.use('/css', express.static(__dirname + '/bootstrap/css/'));
app.use('/js', express.static(__dirname + '/bootstrap/js/'));
app.use('/scripts',express.static(__dirname + '/scripts'));//listens for files inside scripts

serv.listen(8000, '0.0.0.0');
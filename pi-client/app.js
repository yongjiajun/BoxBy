console.log("server started");

var express = require('express');
var app = express();
var serv = require('http').Server(app);
var connectivity = require('connectivity');
var connectivity_status = "Not Available";
var availDisk, freeDisk, totalDisk;


const disk = require('diskusage');
const os = require('os');

let path = os.platform() === 'win32' ? 'c:' : '/';

// set the view engine to ejs
app.set('view engine', 'ejs');

//route for dashboard
app.get('/',function(req, res) {
    console.log("loading pi-stats dashboard...");

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

    res.render(__dirname + '/client/index.ejs', {
        connectivity_status: connectivity_status,
        availDisk: availDisk,
        freeDisk: freeDisk,
        totalDisk: totalDisk,
    });
});

app.use('/client',express.static(__dirname + '/client'));//listens for when the client wants files.
serv.listen(2000);
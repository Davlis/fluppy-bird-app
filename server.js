var express = require('express');
var path = require('path');
var app = express();
var exec = require('child_process').exec;

var fs = require('fs');
var https = require('https');

const API_URL = process.env.API_URL || 'http://localhost:3000';

fs.writeFile('env.json', JSON.stringify({
  API_URL,
}), function (err) {
  if (err) {
    throw err;
  }
});

var tsc = exec('tsc', (err, stdout, stderr) => {

  if (err) {
    console.log(err);
    return;
  }
});

tsc.stdout.on('data', function(data) {
  console.log(data);
});

tsc.stderr.on('data', function(data) {
  console.log(data);
});

app.use('/public', express.static(path.join(__dirname + '/bin')));
app.use('/lib', express.static(path.join(__dirname + '/lib')));
app.use('/node_modules', express.static(path.join(__dirname + '/node_modules')));
app.use('/assets', express.static(path.join(__dirname + '/assets')));
app.use('/env', express.static(path.join(__dirname)));

app.get('/', function(req, res, next) {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.get('/stats', function(req, res, next) {

  https.get(API_URL+'/stats', function(res) {

      var body = '';

      res.on('data', function(chunk) {
          console.log(chunk);
          body += chunk;
      });

      res.on('end', function(data) {
        res.send(data);
      });
  }).on('error', function(e){
      console.log("Got an error: ", e);
  });
});

const port = process.env.PORT || 4200;

app.listen(port, function() {
  console.log(`Server started on port ${port}!`);
});

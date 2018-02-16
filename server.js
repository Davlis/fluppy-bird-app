var express = require('express');
var path = require('path');
var app = express();
var exec = require('child_process').exec;

var fs = require('fs');

fs.writeFile('env.json', JSON.stringify({
  API_URL: process.env.API_URL || 'http://localhost:3000',  
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

const port = process.env.PORT || 4200;

app.listen(port, function() {
  console.log(`Server started on port ${port}!`);
});

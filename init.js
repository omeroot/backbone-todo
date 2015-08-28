var express = require('express');
var http = require('http');
var path = require('path')
var app = express();
var server = http.createServer(app);

app.use(express.static(path.join(__dirname,'public')));

server.listen(1337);

module.exports = app;

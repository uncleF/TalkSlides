/* jslint node: true */

var express = require('express');
var path = require('path');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dev = process.argv[2] === '-dev';

var PUBLIC = !dev ? '/public/' : '/../dev/';

function showSlides(request, response) {
  response.render('index.html');
}

function showInterface(request, response) {
  response.render('client.html');
}

function onConnection(socket) {

  socket.on('sld:prev', function() {
    io.emit('sld:prev');
  });

  socket.on('sld:next', function() {
    io.emit('sld:next');
  });

  socket.on('sld:play', function() {
    io.emit('sld:play');
  });

}

function init() {
  app.set('views', __dirname + PUBLIC);
  app.engine('.html', require('nunjucks').render);
  app.use(express.static(path.join(__dirname, PUBLIC)));
  app.get('/', showSlides);
  app.get('/c', showInterface);
  io.on('connection', onConnection);
  http.listen(8000);
}

init();

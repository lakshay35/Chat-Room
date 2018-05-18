var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
  console.log('listening to requests on port 4000');
});


//Static files
app.use(express.static('public'));


//Socket setup
var io = socket(server);

//Continuous connection to each client
//'io' refers to the whole system
//'socket' refers to the single connection
io.on('connection', function(socket) {

  socket.on('chat', function(data) {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);
  });
});

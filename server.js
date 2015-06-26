var nr = require('newrelic');
var util = require('util');
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 4000;
server.listen(port, function() {
  console.log('Express server listening on port *:' + port);
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  // io.emit('this', { will: 'be received by everyone'});

  socket.on('toserver', nr.createWebTransaction('ws/toserver', function(msg) {
    console.log('==> server got: ', msg);
    nr.endTransaction();
  }));

  socket.on('disconnect', function() {
    io.emit('user disconnected');
  });

});

// boradcast
var totalMessages = 0;
var startTime = +new Date();
setInterval(nr.createWebTransaction('ws/todashboard-proc', function() {

  var atATime = 3;
  for (var i = 0; i < atATime; i++) {
    totalMessages += 1;
    io.emit('toclient', {
      from: 'server-1',
      msg: Math.floor(Math.random() * 1000)
    });

  }
  if (totalMessages % 1000 === 0) {
    var delta = (+new Date() - startTime) / 1000;
    var msg = util.format('total message count: %d in %s seconds  %s msg/s', totalMessages, delta.toFixed(1), (totalMessages / delta).toFixed(2));
    console.log('\n=-= %s\n', msg);
    io.emit('todashboard',{
      from: 'server-1',
      msg: msg
    })
  }
  nr.endTransaction();
}, 10));

var port = process.env.PORT || 4000;
var socket = require('socket.io-client')('http://localhost:'+port);

var clientID = 'client-' + Math.floor(Math.random() * 1000);
socket.on('connect', function() {
  console.log('client ' + clientID + ' socket connected');
});
socket.on('toclient', function(msg) {
  // console.log('client got: ', msg);
  if (Math.random() < 0.001) {
    console.log('<== client responding to: ', msg);
    socket.emit('toserver', {
      from: clientID,
      msg: 'ack ' + msg.msg
    });
  }
});

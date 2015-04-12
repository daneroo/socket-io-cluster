var io = require('socket.io').listen(4000);

io.on('connection', function(socket) {
    // io.emit('this', { will: 'be received by everyone'});

    socket.on('toserver', function(msg) {
        console.log('==> server got: ', msg);
    });

    socket.on('disconnect', function() {
        io.emit('user disconnected');
    });

});

// boradcast
var totalMessages = 0;
var startTime = +new Date();
setInterval(function() {

    var atATime = 2;
    for (var i = 0; i < atATime; i++) {
        totalMessages += 1;
        io.emit('toclient', {
            from: 'server-1',
            msg: Math.floor(Math.random() * 1000)
        });

    }
    if (totalMessages % 1000 === 0) {
        var delta = (+new Date() - startTime) / 1000;
        console.log('\n=-= total message count: %d in %s seconds  %s msg/s\n', totalMessages, delta, totalMessages/delta);
    }
}, 1);

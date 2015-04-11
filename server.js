var io = require('socket.io').listen(4000);

io.on('connection', function(socket) {
    // io.emit('this', { will: 'be received by everyone'});

    socket.on('toserver', function(msg) {
        console.log('server got: ', msg);
    });

    socket.on('disconnect', function() {
        io.emit('user disconnected');
    });

});

// boradcast
setInterval(function() {
    io.emit('toclient', {
        from: 'server-1',
        msg: Math.floor(Math.random() * 1000)
    });
}, 1000);

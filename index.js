var cluster = require('cluster');

var numCPUs = require('os').cpus().length;
var numProcesses = 4;

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numProcesses; i++) {
        cluster.fork();
    }


    Object.keys(cluster.workers).forEach(function(id) {
        console.log("I am running with ID : " + cluster.workers[id].process.pid);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });


    console.log('I am server');
    require('./server');

} else { //cluster.isWorker
    console.log('I am client', cluster.worker.id);
    require('./client');
}

# Docker socket-io-cluster experiment

We are tryning to start multiple cooperating processes to communicate through socket-io.
The start script (`index.js`) actually uses `cluster` to spawn 1 server and many clients.

## TODO

* same thing in one process.

## Building and Running

	docker build -t daneroo/socket-cluster .
	docker run -it --rm daneroo/socket-cluster
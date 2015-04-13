# Docker socket-io-cluster experiment

We are tryning to start multiple cooperating processes to communicate through socket-io.
The start script (`index.js`) actually uses `cluster` to spawn 1 server and many clients.

## TODO

* Add a front end (React)
* Deploy to tutum
* same thing in one process. (no cluster)

## Running on host (node)

  npm install
  node index.js  #or npm start

## Building and Running inside `docker`

Should (should) remove node_modules before building, (if you have been running on host)

	docker build -t daneroo/socket-io-cluster .
	docker run -it --rm -p 8080:8080 daneroo/socket-io-cluster
	docker exec -it <container id> bash

## Deploying: Tutum/AWS
This assumes Tutum has been setup (with a password, which must be added if you log in with github).

  docker login tutum.co
  docker tag -f daneroo/socket-io-cluster tutum.co/daneroo/socket-io-cluster 
  docker push tutum.co/daneroo/socket-io-cluster

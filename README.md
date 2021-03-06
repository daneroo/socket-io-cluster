# Docker socket-io-cluster experiment

We are tryning to start multiple cooperating processes to communicate through socket-io.
The start script (`index.js`) actually uses `cluster` to spawn 1 server and many clients.

This is also an experiment to deploy the app to AWS with docker and Tutum

* Node application / React.js UI (~ 100 loc each)
  * 10 node processes - all communicating with each other through websockets
  * (this simulates the grid plugin system)
  * the server also communicates to our React dashboard over websockets
* This application was packaged into a docker container image
* The container is pushed to a private docker image repository
* A docker capable instance was provisioned on AWS (new virtual machine)
* The application container was deployed into this machine

## TODO

* same thing in one process. (no cluster)

## Running on host (node)
You can see the result at [http://localhost:4000/](http://localhost:4000/)

    npm install
    node index.js  # or npm start

## Building and Running inside `docker`
You can see the result at [http://192.168.59.103:8080/](http://192.168.59.103:8080/), or whatever your local docker IP is.

Should (should) remove node_modules before building, (if you have been running on host)

  	docker build -t daneroo/socket-io-cluster .
  	docker run -it --rm -p 8080:8080 daneroo/socket-io-cluster
  	docker exec -it <container id> bash

## Deploying: Tutum/AWS
This assumes Tutum has been setup (with a password, which must be added if you log in with github).

    docker login tutum.co
    docker tag -f daneroo/socket-io-cluster tutum.co/daneroo/socket-io-cluster 
    docker push tutum.co/daneroo/socket-io-cluster

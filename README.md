# Kalambury 
Recreation of [Kalambury](https://www.kurnik.pl/kalambury/).

### Installation

Kalambury requires:
 - [Node.js](https://nodejs.org/) with Express.js
 - socket.io
 - [p5.js](http://p5js.org/)

Install the dependencies and devDependencies and start the server on [localhost:3000](http://localhost:3000/).

```sh
$ cd kalambury
$ npm install -d
$ npm install express --save
$ npm install socket.io --save
$ node server.js
```
### Todos

 - Build sign up and sign in process security
 - Improve live-draw so just one client can draw at time
 - Add live-chat functionality
 - Implementat game rules and points scoring
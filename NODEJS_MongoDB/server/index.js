const http = require('http'),
      path = require('path'),
      Routing = require('./routes.js'),
      express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');

const PORT = 8082
const app = express()

const Server = http.createServer(app)

mongoose.connect('mongodb://localhost/c7')


app.use(express.static('client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/', Routing)

Server.listen(PORT, function() {
  console.log('Server is listening port: ' + PORT)
})

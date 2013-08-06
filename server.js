/*!
 * nodejs-express-mongoose-demo
 * Copyright(c) 2013 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , passport = require('passport')
  , logger = require('mean-logger')
  , cookie  =   require('cookie')
  , connect =   require('connect')


/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , auth = require('./config/middlewares/authorization')
  , mongoose = require('mongoose')

// Bootstrap db connection
var db = mongoose.connect(config.db)

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
})

// bootstrap passport config
require('./config/passport')(passport, config)

var app = express()

// express settings
require('./config/express')(app, config, passport)

// Bootstrap routes
require('./config/routes')(app, passport, auth)

// Start the app by listening on <port>
var port = process.env.PORT || 3000

//Initializing logger 
logger.init(app, passport, mongoose)


//Sockets

var server = require('http').createServer(app)
var sockets = require('./config/sockets.js');
//Plug socket.io to server
var io = global.io = require('socket.io').listen(server)

var RedisStore = require('socket.io/lib/stores/redis')
  , redis  = require('socket.io/node_modules/redis')
  , pub    = redis.createClient()
  , sub    = redis.createClient()
  , client = redis.createClient();

io.set('store', new RedisStore({
  redis: redis
  , redisPub : pub
  , redisSub : sub
  , redisClient : client
}));

// Socket.io authorization
io.set('authorization', function (handshakeData, accept) {
  console.log("Authorization");

  if (handshakeData.headers.cookie) {
    handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);

    handshakeData.sessionID = connect.utils.parseSignedCookie(handshakeData.cookie['connect.sid'], 'MEAN');

    if (handshakeData.cookie['connect.sid'] == handshakeData.sessionID) {
      return accept('Cookie is invalid.', false);
    }

  } else {
    return accept('No cookie transmitted.', false);
  } 

  accept(null, true);
});

io.set('log level', 1);

//Set all the socket events when a connection is started 
io.on('connection',sockets);



//Start server
server.listen(port);
console.log('Express app started on port '+port)


// expose app
exports = module.exports = app

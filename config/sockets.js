module.exports = function(socket){
    socket.join(socket.handshake.sessionID);
    io.sockets.in(socket.handshake.sessionID).emit('connected',socket.handshake.sessionID);
}



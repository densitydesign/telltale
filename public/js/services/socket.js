window.app.factory('socket', function ($rootScope) {
    var socket = io.connect();

    socket.on('connect', function (data) {
    });

    socket.on('connected', function(sid){
      console.log("connected to session ", sid);
    })

    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }      
    };
  });
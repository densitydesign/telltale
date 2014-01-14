'use strict';

var mapRequest;

angular.module('telltale.system').factory('Api', function($http, $q, $rootScope) {
    
  return {
    
    getMap : function(request){
      
      // aborting previous requests...
      // if (mapRequest && mapRequest.readyState != 4) {
      //   mapRequest.abort();
      //   $rootScope.$broadcast("loading", false);
      // }

      //   mapRequest = $.ajax({
      //     type : 'POST',
      //     data : JSON.stringify(request),
      //     processData : false,
      //     dataType : 'json',
      //     contentType: 'application/json',
      //     url: 'api/map',
      //     beforeSend: function(){ $rootScope.$broadcast("loading", true); }
      //   })
      //   .done(function(){ $rootScope.$broadcast("loading", false); })
      //   return mapRequest;
    }
  }
});
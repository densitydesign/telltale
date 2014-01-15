'use strict';

var mapTweetsRequest;

angular.module('telltale.system').factory('Api', function($http, $q, $rootScope) {
    
  return {
    
    getTweetsMap : function(request){
      
      // aborting previous requests...
      if (mapTweetsRequest && mapTweetsRequest.readyState != 4) {
        mapTweetsRequest.abort();
        $rootScope.$broadcast("loading", false);
      }
        mapTweetsRequest = $.ajax({
          type : 'POST',
          data : JSON.stringify(request),
          processData : false,
          dataType : 'json',
          contentType: 'application/json',
          url: 'api/tweets',
          beforeSend: function(){ $rootScope.$broadcast("loading", true); }
        })
        .done(function(){ $rootScope.$broadcast("loading", false); })
        return mapTweetsRequest;
    }
  }
});
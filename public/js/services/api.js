'use strict';

var mapTweetsRequest,
    timelineTweetsRequest;

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
          url: 'api/tweetsmap',
          beforeSend: function(){ $rootScope.$broadcast("loading", true); }
        })
        .done(function(){ $rootScope.$broadcast("loading", false); })
        return mapTweetsRequest;
    },

    getTweetsTimeline : function(request){
      
      // aborting previous requests...
      if (timelineTweetsRequest && timelineTweetsRequest.readyState != 4) {
        timelineTweetsRequest.abort();
        $rootScope.$broadcast("loading", false);
      }
        timelineTweetsRequest = $.ajax({
          type : 'POST',
          data : JSON.stringify(request),
          processData : false,
          dataType : 'json',
          contentType: 'application/json',
          url: 'api/tweetstimeline',
          beforeSend: function(){ $rootScope.$broadcast("loading", true); }
        })
        .done(function(){ $rootScope.$broadcast("loading", false); })
        return timelineTweetsRequest;
    }
  }
});
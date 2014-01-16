'use strict';

/* Directives */

angular.module('telltale.directives', [])

  .directive('map', [ 'Api', '$rootScope', function (Api, $rootScope){
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

        var data,
            map = telltale.map()
            .center(scope.center)
            .zoom(scope.zoom);

        function reload(){
          Api.getTweetsMap(scope.request)
            .done(function(_data){
              
              data = _data;
              update();
            })
            .fail(function(error){
              scope.error = (error)
            })

        }

        function update(){

          d3.select(element[0])
            .datum(data)
            .call(map)

        }

        scope.$watch('request', function(){
          reload();
        },true)

      }
    }
  }])

  .directive('timeline', [ 'Api', '$rootScope', function (Api, $rootScope){
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

        var data = [];

        var svg = d3.select(element[0])
          .append("svg")
          .attr("width", element.outerWidth())
          .attr("height", 100)
            
        var timeline = telltale.timeline()
            .width(element.outerWidth())
            .height(100)
            .start(scope.default.start)
            .end(scope.default.end)
            .on("brushed", brushed)

        function reload(){
          Api.getTweetsTimeline(scope.request)
            .done(function(_data){
              
              data.push({"source": "twitter", "values": _data});
              update();
            })
            .fail(function(error){
              scope.error = (error)
            })

        }

        function update(){

          svg
            .datum(data)
            .call(timeline)

        }

        function brushed(d){
          scope.request.start = d[0];
          scope.request.end = d[1];
          scope.$apply();
        }
        // scope.$watch('request', function(){
        //   reload();
        // },true)
        reload();
      }
    }
  }])
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
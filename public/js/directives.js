'use strict';

/* Directives */

angular.module('telltale.directives', [])

  .directive('map', [ 'Api', '$rootScope', function (Api, $rootScope){
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

        var map = telltale.map()
          .center(scope.center)
          .zoom(scope.zoom)

        function reload(){

        }

        function update(){

          d3.select(element[0])
            .datum({"data": "nada"})
            .call(map)

        }

        scope.$watch('request', function(){
          update();
        },true)

      }
    }
  }])
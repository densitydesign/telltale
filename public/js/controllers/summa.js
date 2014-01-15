'use strict';

angular.module('telltale.summa').controller('SummaController', ['$scope', '$routeParams', '$location', 'Global', 'Api', function ($scope, $routeParams, $location, Global, Api) {
  
  $scope.global = Global;
  $scope.default = {    
    start: new Date(2013,9,19,0,0,0),
    end: new Date(2013,9,20,0,0,0)
  }

  //set map config
  $scope.center = [45.4640, 9.1916]; //map center
  $scope.southWest = [45.2865, 8.9017]; //sw max bound coordinates
  $scope.northEast = [45.6313, 9.4153]; //ne max bound coordinates
  $scope.zoom = 13; //init zoom

  // set request to api
  $scope.request = {
    start: new Date(2013,9,19,0,0,0),
    end: new Date(2013,9,20,0,0,0),
    format: 'topojson'
  }

}]);
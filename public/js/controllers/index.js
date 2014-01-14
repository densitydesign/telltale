'use strict';

angular.module('telltale.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
}]);
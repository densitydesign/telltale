'use strict';

angular.module('telltale.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    // $scope.menu = [{
    //     'title': 'Articles',
    //     'link': 'articles'
    // }, {
    //     'title': 'Create New Article',
    //     'link': 'articles/create'
    // }];
    $scope.menu = [{
        'title': 'Summa',
        'link': 'summa'
    }, {
        'title': 'Activities',
        'link': 'activities'
    }];
    
    $scope.isCollapsed = false;
}]);
'use strict';

//Setting up route
angular.module('telltale').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        when('/summa', {
            templateUrl: 'views/summa.html'
        }).
        when('/activities', {
            templateUrl: 'views/activities.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('telltale').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
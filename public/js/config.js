//Setup authentication resolver
var authenticationResolver = {
    authentication: ['Global', function(Global) {
        return Global.userPromise;
    }]
};

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html',
            resolve: authenticationResolver
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html',
            resolve: authenticationResolver
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html',
            resolve: authenticationResolver
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html',
            resolve: authenticationResolver
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);

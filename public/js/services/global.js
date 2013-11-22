//Global service for global variables
angular.module('mean.system').factory("Global", ['$http',
    function($http) {
        var _this = this;
        _this._data = {
            userPromise: $http.get('/users/me').success(function(user) {
                if (user) {
                    _this._data.user = user;
                    _this._data.authenticated = true;
                }
            })
        };

        return _this._data;
    }
]);

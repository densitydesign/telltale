angular.module('mean.system').controller('UsersController', ['$scope', 'Global', 'Users',
    function($scope, Global, Users) {
        Users.query({}, function(users) {
            $scope.users = users;
        });
    }
]);
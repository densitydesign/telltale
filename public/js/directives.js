angular.module('mean.system').directive('meanEnterPressed', function() {
    return function(scope, elm, attrs) {
        elm.bind('keypress', function(e) {
            if (e.keyCode === 13 && !e.ctrlKey) scope.$apply(attrs.meanEnterPressed);
        });
    };
});

angular.module('mean.system').directive('meanEscapePressed', function() {
    return function(scope, elm, attrs) {
        elm.bind('keyup', function(e) {
            if (e.keyCode === 27) scope.$apply(attrs.meanEscapePressed);
        });
    };
});

angular.module('mean.system').directive('meanEditable', function() {
    return {
        templateUrl: 'views/directives/mean-editable.html',
        scope: {
            currentModel: '=meanEditable',
            updateFn: '&meanEditableUpdate'
        },
        replace: true,
        link: function(scope, element, attrs) {
            scope.focusOnInput = function() {
                element.find('input')[0].focus();
            };
        },
        controller: ['$scope', '$timeout',
            function($scope, $timeout) {
                $scope.startEditing = function() {
                    $scope.inEdit = true;
                    $timeout($scope.focusOnInput, 100);
                };

                $scope.cancelEditing = function() {
                    $scope.inEdit = false;
                };

                $scope.finishEditing = function() {
                    $scope.inEdit = false;
                    $scope.updateFn();
                };
            }
        ]
    };
});

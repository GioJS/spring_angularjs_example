'use strict';
angular.module('stats').directive('customerPrices', function () {
    return {
        restrict: 'A',
        scope: true,
        controller: ['$rootScope', '$scope', 'Stats', function ($rootScope, $scope, Stats) {
            $scope.refresh = function () {
                Stats.getPricesSum().then(function (result) {
                    $scope.labels = result.data.names;
                    $scope.data = result.data.values;

                    $scope.options = {
                        responsive: true
                    };

                }, function (error) {
                    if (error.data == null) {
                        message($rootScope, 'alert-danger', 'server is down.');

                    } else {
                        message($rootScope, 'alert-danger', error.data.message);

                    }
                    console.log(error)
                });

            };
            $scope.refresh();
        }]
    }
});
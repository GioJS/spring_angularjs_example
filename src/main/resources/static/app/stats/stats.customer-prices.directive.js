'use strict';
angular.module('stats').directive('customerPrices', function () {
    return {
        restrict: 'A',
        controller: ['$rootScope', '$scope', 'Stats', function ($rootScope, $scope, Stats) {
            $scope.refreshPCS = function () {
                Stats.getPricesSum().then(function (result) {
                    $scope.pcs_labels = result.data.names;
                    $scope.pcs_data = result.data.values;

                    $scope.pcs_options = {
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
            $scope.refreshPCS();
        }]
    }
});
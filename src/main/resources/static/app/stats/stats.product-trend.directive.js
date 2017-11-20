'use strict';
angular.module('stats').directive('productsTrend', function () {
    return {
        restrict: 'A',
        controller: ['$rootScope', '$scope', 'Stats', function ($rootScope, $scope, Stats) {

            $scope.refreshPCP = function () {
                Stats.getProductTrend().then(function (result) {

                    $scope.pcp_labels = result.data.names;
                    $scope.pcp_data = result.data.values;

                    $scope.pcp_options = {
                        responsive: true,
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
            $scope.refreshPCP();
        }]
    }
});
'use strict';
angular.module('stats')
    .directive('productsCount', function () {
        return {
            restrict: 'A',
            controller: ['$rootScope', '$scope', 'Stats', function ($rootScope, $scope, Stats) {
                $scope.refreshPCB = function () {
                    Stats.getProductsCounts().then(function (result) {

                        $scope.pcb_labels = result.data.names;
                        $scope.pcb_data = result.data.values;

                        $scope.pcb_options = {
                            responsive: true,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        min: 0,
                                        stepSize: 1
                                    }
                                }]
                            }
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
                $scope.refreshPCB();
            }]
        }
    });
'use strict';
angular.module('customerList').directive('customerDetails', function () {
    return {
        restrict: 'E',
        scope: {
            customer: '='
        },
        controller: ['$scope', '$rootScope', 'Customer', function ($scope, $rootScope, customerSrv) {

            $scope.changeSex = function (customer) {
                if (customer.sex == 'M') {
                    customer.sex = 'F';
                } else {
                    customer.sex = 'M';
                }
            };

            $scope.updateCustomer = function (customer) {
                console.log(customer);
                customerSrv.addCustomer(customer).then(function (result) {
                    message($rootScope, 'alert-success', 'customer updated.');

                    console.log(result);
                    $rootScope.refreshCustomers();
                }, function (error) {
                    if (error.data == null) {
                        message($rootScope, 'alert-danger', 'server is down.');

                    } else {
                        message($rootScope, 'alert-danger', error.data.message);

                    }
                    console.log(error)
                });
            }
        }],
        link: watcher,
        templateUrl: 'app/views/customer/customer_details.html'
    }
});
'use strict';

angular.module('customerList')
    .component('customerList', {
        templateUrl: "app/views/customer/customer_list.html",
        controller: ['$rootScope', 'Customer', function ($rootScope, customerSrv) {
            this.customer_list = [];
            this.searchQuery = '';

            var self = this;

            this.showDetails = function (customer) {
                customer.showDetails = !customer.showDetails;
            };

            this.showProduct = function (customer) {
                customer.showProduct = !customer.showProduct;
            };


            this.visible = function () {
                $rootScope.show = true;
            };

            this.remove = function (id) {
                customerSrv.removeCustomer(id).then(function (result) {
                        $rootScope.refreshCustomers();
                        message($rootScope, 'alert-success', 'customer removed.');

                    },
                    function (error) {
                        if (error.data == null) {
                            message($rootScope, 'alert-danger', 'server is down.');

                        } else {
                            message($rootScope, 'alert-danger', error.data.message);

                        }
                        console.log(error);
                    });
            };

            $rootScope.refreshCustomers = function () {
                customerSrv.getAll().then(function (result) {
                        console.log(result.data);
                        self.customer_list = result.data;
                    },
                    function (error) {
                        if (error.data == null) {
                            message($rootScope, 'alert-danger', 'server is down.');

                        } else {
                            message($rootScope, 'alert-danger', error.data.message);

                        }
                        console.log(error);
                    });
            };

            $rootScope.refreshCustomers();
        }]
    });


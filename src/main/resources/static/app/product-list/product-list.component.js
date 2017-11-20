'use strict';
angular.module('productList')
    .component('productList', {
        templateUrl: "app/views/product/product_list.html",
        controller: ['$rootScope', 'Product', function ($rootScope, productSrv) {
            this.product_list = [];
            this.searchQuery = '';

            var self = this;

            this.showDetails = function (product) {
                product.showDetails = !product.showDetails;
            };


            this.visible = function () {
                $rootScope.show = true;
            };


            $rootScope.refreshProducts = function () {
                productSrv.getAll().then(function (result) {
                        self.product_list = result.data;
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

            $rootScope.refreshProducts();
        }]
    })
    .directive('productDetails', function () {
        return {
            restrict: 'E',
            scope: {
                product: '='
            },
            controller: ['$scope', '$rootScope', 'Product', function ($scope, $rootScope, productSrv) {
                $scope.updateProduct = function (product) {
                    productSrv.addProduct(product).then(function (result) {
                        message($rootScope, 'alert-success', 'product updated.');

                        console.log(result);
                        $rootScope.refreshProducts();
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
            templateUrl: 'app/views/product/product_details.html'
        }
    });

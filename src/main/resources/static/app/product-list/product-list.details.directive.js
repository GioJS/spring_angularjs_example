'use strict';
angular.module('productList').directive('productDetails', function () {
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

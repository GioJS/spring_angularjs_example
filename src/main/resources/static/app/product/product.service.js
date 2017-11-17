'use strict';
//service factory for rest requests to spring
angular.module('product')
    .factory('Product', ['$http',
        function($http) {
            return {
                getAll: function() {
                    return $http.get('/products/getProducts');
                },
                addProduct: function(product) {
                    return $http.put('/products/addProduct', product);
                }
            };
        }
    ]);
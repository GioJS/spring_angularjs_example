angular.module('stats')
       .factory('Stats', ['$http', function($http){
            return {
                getProductsCounts: function () {
                    return $http.get('/statistics/getProductsCustomersBar');
                },
                getProductTrend: function () {
                    return $http.get('/statistics/getProductsTrend');
                },
                getPricesSum: function () {
                    return $http.get('/statistics/getCustomerSumPrices');
                }
            }
       }]);
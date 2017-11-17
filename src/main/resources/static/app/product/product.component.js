'use strict';

angular.module('product')
    .component('product',{
        templateUrl: 'app/views/product/product.html',
        controller: ['$rootScope', 'Product', function ($rootScope, productSrv) {
            this.price = 0.0;
            this.name = '';
            this.description = '';
            $rootScope.message = {};
            $rootScope.show = false;

            var self = this;

            this.close = function() {
                this.price = 0.0;
                this.name = '';
                this.description = '';
                $rootScope.show = false;
                return false;
            };

            this.add = function() {
                //customer object
                var product = {
                    'name': this.name,
                    'description': this.description,
                    'price': this.price
                };
                //call the service to store this object with rest

                productSrv.addProduct(product).then(function(result){
                    console.log(result);
                    self.price = 0.0;
                    self.name = '';
                    self.description = '';
                    $rootScope.show = false;
                    $rootScope.refreshProducts();
                    message($rootScope, 'alert-success', 'product added.');

                }, function(error){
                    if(error.data == null) {
                        message($rootScope, 'alert-danger', 'server is down.');

                    }else {
                        message($rootScope, 'alert-danger', error.data.message);

                    }
                    console.log(error)
                });
            };
        }]
    });
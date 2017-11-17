'use strict';

angular.module('customer')
	   .component('customer', {
		   templateUrl: "app/views/customer/customer.html",
		   controller: ['$rootScope','Customer', function($rootScope, customerSrv) {
               this.firstname = '';
               this.lastname = '';
               this.address = '';
               this.phone = '';
               this.sex = '';
               $rootScope.show = false;
               $rootScope.message = {};

               var self = this;

               this.close = function () {
                   self.firstname = '';
                   self.lastname = '';
                   self.address = '';
                   self.phone = '';
                   self.sex = '';
                   $rootScope.show = false;
                   return false;
               };




			   this.add = function() {
				   //customer object
				   var customer = {
					   'firstname': this.firstname,
					   'lastname': this.lastname,
					   'address': this.address,
					   'phone': this.phone,
					   'sex': this.sex
				   };
				   //call the service to store this object with rest

				   customerSrv.addCustomer(customer).then(function(result){
					   console.log(result);
					   self.firstname = '';
					   self.lastname = '';
					   self.address = '';
					   self.phone = '';
					   self.sex = '';
					   $rootScope.show = false;
					   $rootScope.refreshCustomers();
					   message($rootScope, 'alert-success', 'customer added.');
					   				   }, function(error){
				       if(error.data == null) {
                           message($rootScope, 'alert-danger', 'server is down.');

                       }else {
                           message($rootScope, 'alert-danger', error.data.message);

                       }
				       console.log(error)
				   });
			   }
		   }]
			
	   });
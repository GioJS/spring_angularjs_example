'use strict';
//service factory for rest requests to spring
angular.module('customer')
	   .factory('Customer', ['$http',
		   function($http) {
			   return {
				   getAll: function() {
					   return $http.get('/customers/getCustomers');
				   },
				   addCustomer: function(customer) {
					   return $http.put('/customers/addCustomer', customer);
				   },
				   removeCustomer: function(id) {
					   return $http.delete('/customers/removeCustomer/'+id);
				   }
			   };
		   }
	   ]);
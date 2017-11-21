'use strict';

var app = angular.module('angulargui', ['ui.router','ngAnimate', 'chart.js', 'customer', 'customerList', 'product', 'productList', 'stats']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: 'app/views/customer/customer_home.html'
        })
        .state('customers',{
            templateUrl: 'app/views/customer/customer_home.html'
        })
        .state('products',{
            templateUrl: 'app/views/product/product_home.html'
        })
        .state('stats', {
            templateUrl: 'app/views/stats/stats.html'
        });

});


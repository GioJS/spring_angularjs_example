'use strict';
angular.module('angulargui').directive('editable', function() {
    return {
        restrict: 'A',
        controller: function(){
            this.editable = false;
        },
        link: function($scope, $elem, $attrs) {
            $elem.bind('click', function(){
                $scope.$apply(function(){
                    $scope.editable = true;
                });
            });
        }
    }
});
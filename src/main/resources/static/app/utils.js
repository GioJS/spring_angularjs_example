function watcher($scope, $elem, $attrs) {
    //console.log($attrs)
    $scope.$watch($attrs.ngShow, function(newVal, oldVal) {
        //console.log(newVal, oldVal)
        if(newVal !== oldVal) {
            //console.log('namo');
            $scope.editable = false;
        }

    });
}
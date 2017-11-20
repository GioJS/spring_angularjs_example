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

function message(rootscope, type, description){
    rootscope.message.alert = type;
    rootscope.message.description = description;
    rootscope.message.show = true;
}
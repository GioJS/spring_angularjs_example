function watcher($scope, $elem, $attrs) {
    $scope.$watch($attrs.ngShow, function(newVal, oldVal) {
        if(newVal !== oldVal) {
            $scope.editable = false;
        }

    });
}

function message(rootscope, type, description){
    rootscope.message.alert = type;
    rootscope.message.description = description;
    rootscope.message.show = true;
}